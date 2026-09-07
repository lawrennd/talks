#!/usr/bin/env python3
"""Train the default Dasher language model from pre-2022 authored snippets.

Corpus: markdown includes in the ``snippets`` repository as of the author's
last commit before 2022-01-01 (historical tree via ``git show``), so later
rewrites do not leak into the counts.

Alphabet: the Lamd / academic typing set — Latin letters (both cases),
digits, LaTeX/Markdown punctuation, and the Greek / math symbols that
``talk-notation.tex`` and related macros commonly expand to.  Common
``\\alpha``-style commands in the corpus are expanded to those symbols
before counting so the Greek letters receive real mass.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

# talks/scripts/dasher/ → talks/
TALKS_ROOT = Path(__file__).resolve().parents[2]
SNIPPETS_ROOT = TALKS_ROOT.parent / "snippets"
LAMD_NOTATION = TALKS_ROOT.parent / "lamd" / "lamd" / "includes" / "talk-notation.tex"
OUT_DEFAULT = Path(__file__).resolve().parent / "dasher-lm.json"

sys.path.insert(0, str(TALKS_ROOT))
from arithmetic_coding import (  # noqa: E402
    LAMD_CHARS,
    train_from_text,
    normalise_text,
)

# LaTeX control sequences → Unicode (longest names first)
_LATEX_TO_UNI = {
    "varepsilon": "ε",
    "varphi": "ϕ",
    "vartheta": "ϑ",
    "varrho": "ϱ",
    "varsigma": "ς",
    "varpi": "ϖ",
    "rightarrow": "→",
    "leftarrow": "←",
    "leftrightarrow": "↔",
    "Rightarrow": "⇒",
    "Leftarrow": "⇐",
    "Leftrightarrow": "⇔",
    "infty": "∞",
    "partial": "∂",
    "nabla": "∇",
    "cdot": "·",
    "times": "×",
    "pm": "±",
    "mp": "∓",
    "leq": "≤",
    "geq": "≥",
    "neq": "≠",
    "approx": "≈",
    "equiv": "≡",
    "subset": "⊂",
    "supset": "⊃",
    "cup": "∪",
    "cap": "∩",
    "forall": "∀",
    "exists": "∃",
    "notin": "∉",
    "alpha": "α",
    "beta": "β",
    "gamma": "γ",
    "delta": "δ",
    "epsilon": "ε",
    "zeta": "ζ",
    "eta": "η",
    "theta": "θ",
    "iota": "ι",
    "kappa": "κ",
    "lambda": "λ",
    "mu": "μ",
    "nu": "ν",
    "xi": "ξ",
    "pi": "π",
    "rho": "ρ",
    "sigma": "σ",
    "tau": "τ",
    "upsilon": "υ",
    "phi": "φ",
    "chi": "χ",
    "psi": "ψ",
    "omega": "ω",
    "Alpha": "Α",
    "Beta": "Β",
    "Gamma": "Γ",
    "Delta": "Δ",
    "Epsilon": "Ε",
    "Zeta": "Ζ",
    "Eta": "Η",
    "Theta": "Θ",
    "Iota": "Ι",
    "Kappa": "Κ",
    "Lambda": "Λ",
    "Mu": "Μ",
    "Nu": "Ν",
    "Xi": "Ξ",
    "Pi": "Π",
    "Rho": "Ρ",
    "Sigma": "Σ",
    "Tau": "Τ",
    "Upsilon": "Υ",
    "Phi": "Φ",
    "Chi": "Χ",
    "Psi": "Ψ",
    "Omega": "Ω",
    "ell": "ℓ",
    "sum": "∑",
    "prod": "∏",
    "int": "∫",
    "sqrt": "√",
    "in": "∈",
}


def expand_latex_symbols(text: str) -> str:
    """Replace ``\\alpha``-style tokens with Unicode; leave other macros intact."""
    names = sorted(_LATEX_TO_UNI, key=len, reverse=True)
    pattern = re.compile(r"\\(" + "|".join(names) + r")(?![A-Za-z])")

    def repl(m: re.Match) -> str:
        return _LATEX_TO_UNI[m.group(1)]

    return pattern.sub(repl, text)


def prepare_corpus_text(raw: str) -> str:
    """Light cleanup before alphabet projection."""
    # Drop YAML frontmatter
    if raw.startswith("---"):
        end = raw.find("\n---", 3)
        if end != -1:
            raw = raw[end + 4 :]
    text = expand_latex_symbols(raw)
    # Collapse whitespace runs after newline→space mapping in normalise
    return text


# ── Corpus from git ────────────────────────────────────────────────────────────

def pre2022_commit(repo: Path, author: str = "Neil Lawrence") -> str:
    return subprocess.check_output(
        [
            "git",
            "-C",
            str(repo),
            "rev-list",
            "-n",
            "1",
            "--before=2022-01-01",
            f"--author={author}",
            "HEAD",
        ],
        text=True,
    ).strip()


def git_show(repo: Path, commit: str, path: str) -> str:
    try:
        data = subprocess.check_output(
            ["git", "-C", str(repo), "show", f"{commit}:{path}"],
            stderr=subprocess.DEVNULL,
        )
        return data.decode("utf-8", errors="replace")
    except subprocess.CalledProcessError:
        return ""


def collect_snippets_corpus(repo: Path) -> tuple[str, dict]:
    commit = pre2022_commit(repo)
    names = subprocess.check_output(
        ["git", "-C", str(repo), "ls-tree", "-r", "--name-only", commit],
        text=True,
    ).splitlines()
    # Historical layout nested under snippets/; also accept flat includes
    mds = [
        n
        for n in names
        if n.endswith(".md")
        and ("/includes/" in n or n.startswith("includes/"))
    ]
    parts = []
    for path in mds:
        body = git_show(repo, commit, path)
        if body:
            parts.append(prepare_corpus_text(body))
    meta = {
        "repo": str(repo),
        "commit": commit,
        "files": len(mds),
        "bytes_raw": sum(len(p) for p in parts),
        "before": "2022-01-01",
        "author": "Neil Lawrence",
    }
    return "\n".join(parts), meta


def main(argv=None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument(
        "-o",
        "--output",
        type=Path,
        default=OUT_DEFAULT,
        help=f"output JSON (default: {OUT_DEFAULT})",
    )
    p.add_argument(
        "--snippets",
        type=Path,
        default=SNIPPETS_ROOT,
        help="path to snippets git repo",
    )
    p.add_argument(
        "-w",
        "--bigram-weight",
        type=float,
        default=0.82,
    )
    p.add_argument(
        "--add-k",
        type=float,
        default=0.01,
        help="additive smoothing so rare Lamd symbols stay reachable",
    )
    args = p.parse_args(argv)

    if not (args.snippets / ".git").exists():
        print(f"error: not a git repo: {args.snippets}", file=sys.stderr)
        return 1

    corpus, meta = collect_snippets_corpus(args.snippets)
    # Seed a little talk-notation so every mapped symbol appears at least once
    if LAMD_NOTATION.is_file():
        corpus = corpus + "\n" + prepare_corpus_text(LAMD_NOTATION.read_text(encoding="utf-8"))
        meta["notation"] = str(LAMD_NOTATION)

    chars = LAMD_CHARS
    model = train_from_text(
        corpus,
        chars=chars,
        bigram_weight=args.bigram_weight,
        map_other_to_space=True,
        add_k=args.add_k,
        lowercase=False,
    )

    payload = model.to_dasher_dict()
    payload["meta"] = {
        **meta,
        "alphabet": "lamd",
        "alphabetSize": len(chars),
        "trained": date.today().isoformat(),
        "normalisedBytes": len(normalise_text(corpus, chars, lowercase=False)),
        "H0": round(model.entropy_rate(""), 4),
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Wrote {args.output}")
    print(f"  commit  {meta['commit'][:12]}  files={meta['files']}")
    print(f"  alphabet {len(chars)} symbols  H(∅)={payload['meta']['H0']} bits/char")
    print(f"  normalised bytes {payload['meta']['normalisedBytes']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
