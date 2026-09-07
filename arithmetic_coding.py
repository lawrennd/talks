"""Arithmetic coding for a simple character language model.

Teaching code following MacKay, *Information Theory, Inference, and Learning
Algorithms*, Chapter 6 (Stream Codes) [@MacKay-information03].

MacKay's framing (which this module mirrors):

1. Compression entails *probabilistic modelling* of the source (Ch. 6 opener).
2. The *guessing game* (Sec. 6.1) shows that a predictor mapping symbols onto
   a skewed alphabet is enough to compress — if an identical twin runs at
   the decoder.
3. Arithmetic coding (Sec. 6.2) replaces the human predictor by a program
   that supplies a predictive distribution ``{p_i}`` over the next symbol.
   Modelling is clearly separated from the encoding operation.
4. Algorithm 6.3 narrows an interval ``[u, v) ⊆ [0, 1)`` using the cumulative
   probabilities ``Q_n`` and ``R_n``.  The length of the final interval equals
   the joint probability of the string under the model.
5. Any binary string whose interval lies inside ``[u, v)`` is a valid code;
   the overhead relative to ``h(x|H) = log[1/P(x|H)]`` is at most two bits.

Dasher draws those nested intervals as screen boxes: zooming into a letter
*is* the encoder's interval update.

This module also:

* estimates a unigram + bigram blend matching the Dasher front-end, and
* exports ``dasher-lm.json`` so students can see their model as box heights.

Example::

    python arithmetic_coding.py corpus.txt -o scripts/dasher/dasher-lm.json
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Dict, Iterable, List, Mapping, MutableMapping, Optional, Sequence, Tuple

DEFAULT_CHARS = "abcdefghijklmnopqrstuvwxyz "
DEFAULT_BIGRAM_WEIGHT = 0.82

# Fuller Lamd / academic alphabet (Latin case, digits, TeX punct, Greek, math).
# Used by scripts/dasher/train_default_lm.py for the shipped dasher-lm.json.
LAMD_CHARS = (
    "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789"
    " .,:;!?\"'`-_/\\|~@#%&*+=<>^()[]{}$\\"
    "αβγδεζηθικλμνξοπρσςτυφχψωϕϵϑϱϖ"
    "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"
    "∞∂∇∑∏∫√±∓×·÷≤≥≠≈≡∈∉⊂⊃∪∩→←↔⇒⇔∀∃∄ℓ′″…—–−"
)


# ── Text normalisation ─────────────────────────────────────────────────────────

def normalise_text(
    text: str,
    chars: str = DEFAULT_CHARS,
    *,
    map_other_to_space: bool = True,
    lowercase: bool = True,
) -> str:
    """Map text onto the model alphabet.

    When ``lowercase`` is true (teaching default), Latin letters are folded.
    For the Lamd alphabet, pass ``lowercase=False`` so case and symbols keep
    their identity.  Newlines / tabs become spaces when
    ``map_other_to_space`` is true; other characters are dropped.
    """
    alpha = set(chars)
    out: List[str] = []
    for raw in text:
        ch = raw.lower() if lowercase else raw
        if ch in alpha:
            out.append(ch)
        elif map_other_to_space and raw in "\n\r\t ":
            if " " in alpha:
                out.append(" ")
    return "".join(out)


# ── Language model ─────────────────────────────────────────────────────────────

@dataclass
class CharModel:
    """Unigram + bigram blend used by both the codec and Dasher."""

    chars: str = DEFAULT_CHARS
    bigram_weight: float = DEFAULT_BIGRAM_WEIGHT
    uni: Dict[str, float] = field(default_factory=dict)
    bi: Dict[str, Dict[str, float]] = field(default_factory=dict)

    def predict(self, context: str) -> Dict[str, float]:
        """Return P(c | last character of context) over ``self.chars``."""
        last = context[-1].lower() if context else ""
        row = self.bi.get(last, {})
        w = self.bigram_weight
        out: Dict[str, float] = {}
        for ch in self.chars:
            bp = row.get(ch, 0.0)
            up = self.uni.get(ch, 1e-4)
            out[ch] = w * bp + (1.0 - w) * up
        z = sum(out.values())
        if z <= 0:
            # Degenerate model → uniform
            u = 1.0 / len(self.chars)
            return {ch: u for ch in self.chars}
        return {ch: p / z for ch, p in out.items()}

    def entropy_rate(self, context: str = "") -> float:
        """Shannon entropy H(next | context) in bits."""
        probs = self.predict(context)
        return -sum(p * math.log2(p) for p in probs.values() if p > 0)

    def message_bits(self, message: str) -> float:
        """Ideal code length −∑ log₂ P(c_t | c_<t) in bits."""
        bits = 0.0
        for i, ch in enumerate(message):
            p = self.predict(message[:i]).get(ch, 0.0)
            if p <= 0:
                return float("inf")
            bits -= math.log2(p)
        return bits

    def to_dasher_dict(self) -> dict:
        """Serialise to the JSON object Dasher's ``setLanguageModel`` expects."""
        return {
            "chars": self.chars,
            "bigramWeight": self.bigram_weight,
            "uni": {ch: self.uni.get(ch, 0.0) for ch in self.chars},
            "bi": {
                prev: {ch: float(p) for ch, p in row.items()}
                for prev, row in self.bi.items()
            },
        }


def train_from_text(
    text: str,
    *,
    chars: str = DEFAULT_CHARS,
    bigram_weight: float = DEFAULT_BIGRAM_WEIGHT,
    map_other_to_space: bool = True,
    add_k: float = 0.0,
    lowercase: bool = True,
) -> CharModel:
    """Count unigrams and bigrams and return a :class:`CharModel`.

    Parameters
    ----------
    text:
        Training corpus (any Unicode).  Normalised onto ``chars``.
    bigram_weight:
        Blend weight *w* in P ∝ w·bigram + (1−w)·unigram.  Dasher's default
        hand-tuned model uses 0.82.
    add_k:
        Optional additive smoothing on raw counts (0 = maximum likelihood).
        A small value such as 0.01 avoids zero probabilities for unseen
        characters without flattening the model much.
    lowercase:
        Fold Latin letters when True.  Use False with :data:`LAMD_CHARS`.
    """
    data = normalise_text(
        text,
        chars,
        map_other_to_space=map_other_to_space,
        lowercase=lowercase,
    )
    if not data:
        raise ValueError("training text contains no alphabet characters")

    uni_counts: Dict[str, float] = {ch: add_k for ch in chars}
    bi_counts: Dict[str, Dict[str, float]] = defaultdict(
        lambda: {ch: add_k for ch in chars}
    )

    prev: Optional[str] = None
    for ch in data:
        uni_counts[ch] += 1.0
        if prev is not None:
            bi_counts[prev][ch] += 1.0
        prev = ch

    n = sum(uni_counts.values())
    uni = {ch: uni_counts[ch] / n for ch in chars}

    bi: Dict[str, Dict[str, float]] = {}
    for prev_ch, row in bi_counts.items():
        total = sum(row.values())
        if total <= 0:
            continue
        # Keep only mass that came from data (or smoothing) — Dasher blends
        # sparse rows with the unigram itself.
        sparse = {ch: row[ch] / total for ch in chars if row[ch] > 0}
        if sparse:
            bi[prev_ch] = sparse

    return CharModel(chars=chars, bigram_weight=bigram_weight, uni=uni, bi=bi)


def write_dasher_lm(model: CharModel, path: str, *, indent: int = 2) -> None:
    """Write ``dasher-lm.json`` for the interactive visualiser."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(model.to_dasher_dict(), f, indent=indent)
        f.write("\n")


def load_dasher_lm(path: str) -> CharModel:
    """Load a model previously written by :func:`write_dasher_lm`."""
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    return CharModel(
        chars=spec.get("chars", DEFAULT_CHARS),
        bigram_weight=float(spec.get("bigramWeight", DEFAULT_BIGRAM_WEIGHT)),
        uni={k: float(v) for k, v in spec.get("uni", {}).items()},
        bi={
            prev: {k: float(v) for k, v in row.items()}
            for prev, row in spec.get("bi", {}).items()
        },
    )


# ── Arithmetic coding (MacKay Algorithm 6.3) ───────────────────────────────────
#
# Notation matches the book:
#   Q_n(a_i | x_<n)  = sum of P(x_n = a_j | …) for j < i   (lower cumulative)
#   R_n(a_i | x_<n)  = sum of P(x_n = a_j | …) for j ≤ i   (upper cumulative)
# Interval update (Alg. 6.3):
#   u := 0;  v := 1;  p := v − u
#   for each symbol x_n:
#       v := u + p · R_n(x_n | …)
#       u := u + p · Q_n(x_n | …)
#       p := v − u
# The length p of the final interval equals P(message | model).


def cumulative_QR(
    probs: Mapping[str, float], chars: str
) -> Tuple[Dict[str, float], Dict[str, float]]:
    """Return MacKay's ``Q_n`` and ``R_n`` for one predictive distribution."""
    Q: Dict[str, float] = {}
    R: Dict[str, float] = {}
    cum = 0.0
    for ch in chars:
        Q[ch] = cum
        cum += probs.get(ch, 0.0)
        R[ch] = cum
    # Guard floating-point drift so the last symbol reaches 1.
    if chars:
        R[chars[-1]] = 1.0
    return Q, R


def encode_interval(message: str, model: CharModel) -> Tuple[float, float, float]:
    """Run Algorithm 6.3; return ``(u, v, ideal_bits)``.

    The open-closed interval ``[u, v) ⊆ [0, 1)`` is the code region for
    ``message``.  Its length ``v − u`` equals the joint probability of the
    string under the model (up to floating-point error).  Ideal bits are
    MacKay's Shannon information content ``h(x|H) = log₂[1/P(x|H)]``.
    """
    u, v = 0.0, 1.0
    p = v - u
    ideal = 0.0
    for i, ch in enumerate(message):
        if ch not in model.chars:
            raise ValueError(f"character {ch!r} is not in the model alphabet")
        probs = model.predict(message[:i])
        pc = probs[ch]
        if pc <= 0:
            raise ValueError(f"zero probability for {ch!r} in context {message[:i]!r}")
        ideal -= math.log2(pc)
        Q, R = cumulative_QR(probs, model.chars)
        # MacKay Alg. 6.3: update v first, then u, then width.
        v = u + p * R[ch]
        u = u + p * Q[ch]
        p = v - u
    return u, v, ideal


def tag_bits(u: float, v: float) -> Tuple[str, float]:
    """Choose a binary string whose dyadic interval lies inside ``[u, v)``.

    MacKay Fig. 6.1: a bitstring defines a sub-interval of ``[0, 1)``.  We
    walk toward the midpoint of ``[u, v)`` until the dyadic interval we have
    committed to sits wholly inside the code interval (Exercise 6.1: the
    overhead is at most about two bits relative to ``−log₂(v − u)``).
    """
    if not (0.0 <= u < v <= 1.0):
        raise ValueError("need 0 ≤ u < v ≤ 1")
    target = 0.5 * (u + v)
    lo, hi = 0.0, 1.0
    bits: List[str] = []
    for _ in range(64):
        if lo >= u and hi <= v:
            break
        mid = 0.5 * (lo + hi)
        if target < mid:
            bits.append("0")
            hi = mid
        else:
            bits.append("1")
            lo = mid
    return "".join(bits), float(len(bits))


def encode(message: str, model: CharModel) -> Tuple[str, float]:
    """Arithmetic-encode ``message``; return ``(bitstring, ideal_bits)``."""
    if not message:
        return "", 0.0
    u, v, ideal = encode_interval(message, model)
    bits, _ = tag_bits(u, v)
    return bits, ideal


def decode(bitstring: str, length: int, model: CharModel) -> str:
    """Decode ``length`` symbols from a binary string produced by :func:`encode`.

    The decoder is MacKay's "identical twin": it recomputes the same
    predictive distributions and asks which symbol-interval contains the
    number defined by ``bitstring``.
    """
    # Interpret the bitstring as the left endpoint of its dyadic interval,
    # with an implicit infinite tail of zeros — enough to identify symbols.
    value = 0.0
    scale = 0.5
    for b in bitstring:
        if b == "1":
            value += scale
        scale *= 0.5
    # Midpoint of the dyadic interval gives a stable interior point.
    value += 0.5 * scale

    u, v = 0.0, 1.0
    out: List[str] = []
    for _ in range(length):
        p = v - u
        probs = model.predict("".join(out))
        Q, R = cumulative_QR(probs, model.chars)
        chosen = None
        for ch in model.chars:
            lo = u + p * Q[ch]
            hi = u + p * R[ch]
            if lo <= value < hi or (ch == model.chars[-1] and lo <= value <= hi):
                chosen = ch
                u, v = lo, hi
                break
        if chosen is None:
            raise ValueError("failed to decode symbol — value outside all bins")
        out.append(chosen)
    return "".join(out)


def interval_trace(message: str, model: CharModel) -> List[dict]:
    """Nested ``[u, v)`` after each symbol — MacKay Fig. 6.2 / 6.4 as data.

    Each row is one zoom step: the same nesting Dasher draws as boxes.
    """
    u, v = 0.0, 1.0
    p = v - u
    steps = []
    for i, ch in enumerate(message):
        probs = model.predict(message[:i])
        Q, R = cumulative_QR(probs, model.chars)
        v = u + p * R[ch]
        u = u + p * Q[ch]
        p = v - u
        steps.append({
            "index": i,
            "char": ch,
            "p": probs[ch],
            "bits": -math.log2(probs[ch]) if probs[ch] > 0 else float("inf"),
            "u": u,
            "v": v,
            "width": p,
        })
    return steps


# ── CLI ────────────────────────────────────────────────────────────────────────

_DEMO_CORPUS = """
Alice was beginning to get very tired of sitting by her sister on the bank,
and of having nothing to do: once or twice she had peeped into the book her
sister was reading, but it had no pictures or conversations in it, and what
is the use of a book thought Alice without pictures or conversations.
So she was considering in her own mind as well as she could, for the hot day
made her feel very sleepy and stupid, whether the pleasure of making a
daisy-chain would be worth the trouble of getting up and picking the daisies,
when suddenly a White Rabbit with pink eyes ran close by her.
"""


def _build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Train a Dasher language model and demonstrate arithmetic coding.",
    )
    p.add_argument(
        "corpus",
        nargs="?",
        help="path to a training text file (default: built-in Alice sample)",
    )
    p.add_argument(
        "-o", "--output",
        default="scripts/dasher/dasher-lm.json",
        help="where to write dasher-lm.json (default: %(default)s)",
    )
    p.add_argument(
        "-w", "--bigram-weight",
        type=float,
        default=DEFAULT_BIGRAM_WEIGHT,
        help="blend weight w in w·bigram + (1-w)·unigram (default: %(default)s)",
    )
    p.add_argument(
        "--chars",
        default=DEFAULT_CHARS,
        help="alphabet string (default: a-z and space)",
    )
    p.add_argument(
        "--add-k",
        type=float,
        default=0.0,
        help="additive smoothing on counts (default: 0)",
    )
    p.add_argument(
        "--encode",
        metavar="TEXT",
        help="also arithmetic-encode this string and print bit cost",
    )
    p.add_argument(
        "--demo",
        action="store_true",
        help="run encode/decode round-trip on a short phrase",
    )
    return p


def main(argv: Optional[Sequence[str]] = None) -> int:
    args = _build_parser().parse_args(argv)

    if args.corpus:
        with open(args.corpus, encoding="utf-8") as f:
            text = f.read()
    else:
        text = _DEMO_CORPUS
        print("No corpus given — training on the built-in Alice sample.", file=sys.stderr)

    model = train_from_text(
        text,
        chars=args.chars,
        bigram_weight=args.bigram_weight,
        add_k=args.add_k,
    )
    write_dasher_lm(model, args.output)
    print(f"Wrote Dasher model ({len(model.chars)} chars) → {args.output}")
    print(f"Unigram entropy H(C) = {model.entropy_rate(''):.3f} bits/char")

    sample = args.encode or ("the rabbit" if args.demo or not args.encode else None)
    if args.demo and not args.encode:
        sample = "the rabbit"
    if sample:
        msg = normalise_text(sample, model.chars)
        bits, ideal = encode(msg, model)
        recovered = decode(bits, len(msg), model)
        print(f"Message:   {msg!r}")
        print(f"Ideal length: {ideal:.3f} bits  ({ideal / max(len(msg), 1):.3f} bits/char)")
        print(f"Bitstring: {bits}  ({len(bits)} bits)")
        print(f"Decoded:   {recovered!r}  match={recovered == msg}")
        uniform_bits = len(msg) * math.log2(len(model.chars))
        print(f"Uniform length would be {uniform_bits:.3f} bits "
              f"({uniform_bits / max(len(msg), 1):.3f} bits/char)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
