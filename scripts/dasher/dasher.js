// Copyright (c) 2026 Neil D. Lawrence
//
// Dasher: continuous-zoom arithmetic coding visualiser.
// Geometry follows MacKay / Ward Dasher (see dasher-hello-world.gif and
// the canonical square-view model):
//
//   - Crosshair fixed on screen
//   - Every node is a rectangle whose Dasher-space WIDTH equals its
//     Dasher-space HEIGHT (the Y-range).  Both parent and child extend
//     to dasherX = 0 (the right edge of the screen).  A child therefore
//     sits strictly INSIDE its parent: smaller Y-range ⇒ left edge
//     further to the right.
//   - Zooming changes rootmin/rootmax so nodes grow and stream left
//     across the crosshair; nesting is preserved because it is baked
//     into the coordinate system.
//
// Expected DOM (ids prefixed "dasher-"):
//   dasher-canvas, dasher-text, dasher-bits, dasher-avgbits,
//   dasher-entropy, dasher-reset, dasher-pause, dasher-copy
//
// Classic controls: click canvas or Space toggles Go/Pause;
// Copy extracts the typed buffer to the clipboard.

(function () {
'use strict';

// ── Language model ────────────────────────────────────────────────────────────
//
// Default tables live in dasher-lm.json (same directory).  They can be
// replaced at runtime:
//   Dasher.setLanguageModel({ chars, uni, bi, bigramWeight })
//   Dasher.trainFromText(corpusString)
//   Dasher.getLanguageModel()
// Optional: <canvas data-dasher-lm="path/to/model.json">

const DEFAULT_LM = {
    chars: 'abcdefghijklmnopqrstuvwxyz ',
    bigramWeight: 0.82,
    uni: {
        ' ':0.183,'e':0.103,'t':0.074,'a':0.064,'o':0.062,'i':0.057,
        'n':0.055,'s':0.052,'h':0.047,'r':0.047,'d':0.034,'l':0.033,
        'u':0.023,'c':0.022,'m':0.020,'w':0.017,'f':0.016,'g':0.015,
        'y':0.015,'p':0.015,'b':0.011,'v':0.007,'k':0.006,'j':0.001,
        'x':0.001,'q':0.001,'z':0.001
    },
    bi: {
        ' ':{t:0.15,a:0.12,o:0.10,s:0.09,i:0.08,h:0.07,w:0.07,b:0.05,f:0.04,m:0.04},
        'q':{u:0.94,a:0.02,i:0.01,e:0.01,o:0.01,' ':0.01},
        't':{h:0.30,e:0.09,o:0.08,i:0.07,a:0.06,r:0.05,s:0.04,l:0.03,u:0.03,' ':0.05},
        'h':{e:0.36,a:0.14,i:0.13,o:0.09,r:0.05,u:0.04,t:0.03,y:0.03,' ':0.05},
        'e':{' ':0.19,r:0.11,d:0.09,n:0.09,s:0.08,l:0.06,a:0.05,t:0.05,i:0.04,v:0.03},
        'a':{n:0.18,t:0.12,l:0.09,s:0.08,r:0.07,c:0.06,i:0.05,d:0.04,y:0.03,' ':0.06},
        's':{t:0.14,e:0.14,' ':0.13,i:0.10,h:0.08,a:0.07,o:0.05,u:0.04,s:0.03},
        'i':{n:0.25,s:0.11,t:0.09,o:0.08,c:0.07,l:0.06,e:0.06,a:0.04,r:0.04},
        'n':{' ':0.19,g:0.14,d:0.12,e:0.10,t:0.08,a:0.06,s:0.05,o:0.04,i:0.03},
        'o':{n:0.18,r:0.13,u:0.10,t:0.09,f:0.08,s:0.06,m:0.05,w:0.04,' ':0.07},
        'r':{e:0.21,' ':0.16,a:0.10,i:0.08,o:0.07,s:0.06,t:0.05,n:0.04},
        'l':{l:0.15,e:0.20,y:0.08,i:0.10,a:0.09,d:0.05,s:0.05,' ':0.04},
        'd':{' ':0.25,e:0.15,i:0.10,a:0.08,o:0.07,r:0.05,s:0.04,u:0.04},
        'g':{h:0.22,e:0.15,' ':0.14,r:0.10,i:0.08,a:0.07,o:0.06},
    }
};

const LM = {
    chars: DEFAULT_LM.chars,
    bigramWeight: DEFAULT_LM.bigramWeight,
    uni: Object.assign({}, DEFAULT_LM.uni),
    bi: JSON.parse(JSON.stringify(DEFAULT_LM.bi)),
};

function cloneLM(spec) {
    return {
        chars: spec.chars || DEFAULT_LM.chars,
        bigramWeight: (typeof spec.bigramWeight === 'number')
            ? spec.bigramWeight : DEFAULT_LM.bigramWeight,
        uni: Object.assign({}, spec.uni || {}),
        bi: JSON.parse(JSON.stringify(spec.bi || {})),
    };
}

function applyLanguageModel(spec, opts) {
    const next = cloneLM(spec || DEFAULT_LM);
    if (!next.chars || !next.chars.length) {
        throw new Error('Dasher language model needs a non-empty chars string');
    }
    LM.chars = next.chars;
    LM.bigramWeight = next.bigramWeight;
    LM.uni = next.uni;
    LM.bi = next.bi;
    if (!opts || opts.reset !== false) {
        // Rebuild the zoom tree under the new probabilities (only after boot)
        if (typeof initRoot === 'function' && typeof S !== 'undefined' && S.root !== undefined) {
            initRoot();
            updateDisplay();
            render();
        }
    }
    return getLanguageModel();
}

function getLanguageModel() {
    return cloneLM(LM);
}

function trainFromText(text, opts) {
    opts = opts || {};
    const chars = opts.chars || LM.chars || DEFAULT_LM.chars;
    const alpha = new Set(chars.split(''));
    const mapOther = opts.mapOtherToSpace !== false;
    const uniCounts = {};
    const biCounts = {};
    for (const ch of chars) uniCounts[ch] = 0;

    let prev = null;
    let n = 0;
    for (let i = 0; i < text.length; i++) {
        let ch = text.charAt(i).toLowerCase();
        if (!alpha.has(ch)) {
            if (mapOther && (ch === '\n' || ch === '\t' || ch === '\r' || ch === ' ')) {
                ch = ' ';
                if (!alpha.has(ch)) continue;
            } else {
                continue;
            }
        }
        uniCounts[ch] = (uniCounts[ch] || 0) + 1;
        n++;
        if (prev !== null) {
            if (!biCounts[prev]) biCounts[prev] = {};
            biCounts[prev][ch] = (biCounts[prev][ch] || 0) + 1;
        }
        prev = ch;
    }
    if (n === 0) throw new Error('Dasher.trainFromText: no alphabet characters found');

    const uni = {};
    for (const ch of chars) uni[ch] = (uniCounts[ch] || 0) / n;

    const bi = {};
    for (const prevCh of Object.keys(biCounts)) {
        const row = biCounts[prevCh];
        const total = Object.values(row).reduce((a, b) => a + b, 0);
        if (total <= 0) continue;
        bi[prevCh] = {};
        for (const nextCh of Object.keys(row)) {
            bi[prevCh][nextCh] = row[nextCh] / total;
        }
    }

    return applyLanguageModel({
        chars,
        bigramWeight: (typeof opts.bigramWeight === 'number')
            ? opts.bigramWeight : LM.bigramWeight,
        uni,
        bi,
    }, opts);
}

function getProbs(context) {
    const last = context.slice(-1).toLowerCase();
    const bg   = LM.bi[last];
    const out  = {};
    for (const ch of LM.chars) {
        const bp = (bg && bg[ch]) ? bg[ch] : 0;
        const up = LM.uni[ch] || 0.0001;
        out[ch]  = LM.bigramWeight * bp + (1 - LM.bigramWeight) * up;
    }
    const sum = Object.values(out).reduce((a, b) => a + b, 0);
    for (const ch of LM.chars) out[ch] /= sum;
    return out;
}

function entropy(probs) {
    return Object.values(probs).reduce((H, p) => p > 0 ? H - p * Math.log2(p) : H, 0);
}

// Pastel palette (vowels / consonants / space), GIF-like
const VOWELS = 'aeiou';
function colorFor(ch) {
    if (ch === ' ') return '#ffffff';
    if (VOWELS.includes(ch)) return '#ffc9c9';
    const palette = [
        '#a8e6cf','#dcedc1','#ffd3b6','#ffaaa5','#c5a3ff',
        '#b5eada','#a0c4ff','#caffbf','#fdffb6','#ffc6ff',
        '#bdb2ff','#9bf6ff','#fffffc','#e0fbfc','#c8b6ff'
    ];
    return palette[ch.charCodeAt(0) % palette.length];
}

// ── Dasher coordinate system ──────────────────────────────────────────────────
//
// Y ∈ [0, MAX_Y].  Crosshair at (ORIGIN_X, ORIGIN_Y).
// Square (isotropic) screen mapping — required for GIF-like nesting:
//   scaleX = scaleY = min(W,H) / MAX_Y
//   screenX = W - dasherX * scaleX
//   so dasherX = 0 is the RIGHT edge; dasherX = ORIGIN_X is the crosshair.
// A node covering Dasher-Y [y1, y2] is drawn with
//   dasherX_left = (y2 - y1)     // width ≡ height in Dasher *and* screen space
//   dasherX_right = 0            // always to the right edge of the screen
// Children inherit a sub-interval of [y1, y2], so they are strictly nested:
// smaller Y-range ⇒ left edge further right, still inside the parent.

const MAX_Y    = 4096;
const ORIGIN_X = 2048;
const ORIGIN_Y = 2048;
const NORM     = 65536;          // child bounds in [0, NORM]

const N_STEPS = 18;              // zoom speed (larger = slower)
const MIN_PX  = 2;               // skip nodes shorter than this
const EXPAND_PX = 14;            // expand children once taller than this

const canvas = document.getElementById('dasher-canvas');
if (!canvas) { return; }
const ctx = canvas.getContext('2d');

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// ── Node tree ─────────────────────────────────────────────────────────────────

function makeNode(token, lbnd, hbnd, parent, context) {
    return {
        token, lbnd, hbnd, parent,
        context: context || '',
        children: null,
        bits: hbnd > lbnd ? -Math.log2((hbnd - lbnd) / NORM) : 0,
    };
}

function expandNode(node) {
    if (node.children) return;
    const probs = getProbs(node.context);
    node.children = [];

    // Largest-remainder integer allocation over NORM so shares sum exactly
    // and every positive-probability symbol gets ≥ 1.  The old round-and-
    // skip path left gaps (empty parent colour) where tiny probs vanished.
    const alphabet = LM.chars;
    const exact = [];
    for (const ch of alphabet) exact.push((probs[ch] || 0) * NORM);
    const share = exact.map(v => Math.floor(v));
    let left = NORM - share.reduce((a, b) => a + b, 0);

    const fracOrder = exact
        .map((v, i) => ({ i, frac: v - share[i], p: probs[alphabet[i]] || 0 }))
        .sort((a, b) => b.frac - a.frac || a.i - b.i);

    for (const o of fracOrder) {
        if (left <= 0) break;
        if (o.p > 0 && share[o.i] === 0) {
            share[o.i] = 1;
            left--;
        }
    }
    for (const o of fracOrder) {
        if (left <= 0) break;
        share[o.i]++;
        left--;
    }

    let cum = 0;
    for (let i = 0; i < alphabet.length; i++) {
        const lo = cum;
        cum += share[i];
        if (cum > lo) {
            node.children.push(makeNode(alphabet[i], lo, cum, node, node.context + alphabet[i]));
        }
    }
    if (node.children.length) {
        node.children[0].lbnd = 0;
        node.children[node.children.length - 1].hbnd = NORM;
    }
}

function childBounds(child, parentY1, parentY2) {
    const range = parentY2 - parentY1;
    return {
        y1: parentY1 + range * child.lbnd / NORM,
        y2: parentY1 + range * child.hbnd / NORM,
    };
}

// ── Model state ───────────────────────────────────────────────────────────────

const S = {
    root:     null,
    rootmin:  0,
    rootmax:  MAX_Y,
    oldRoots: [],            // promoted-away ancestors (keeps coords bounded)
    mouseX:   null,
    mouseY:   null,
    paused:   true,          // classic Dasher: click / Space to start
    text:     '',
    totalBits: 0,
    charBits: [],
    path:     [],            // nodes under crosshair below current root
    scaleX:   1,
    scaleY:   1,
    crossX:   0,
    crossY:   0,
};

function initRoot() {
    S.root = makeNode('', 0, NORM, null, '');
    expandNode(S.root);
    // Start slightly "inside" the root so the alphabet sits on the right
    const width = MAX_Y * 1.15;
    S.rootmin = ORIGIN_Y - width / 2;
    S.rootmax = ORIGIN_Y + width / 2;
    S.oldRoots = [];
    S.text = '';
    S.charBits = [];
    S.totalBits = 0;
    S.path = [];
}

// Promote a child to root so rootmin/rootmax stay O(MAX_Y).
// Without this, deep zooms send the span to 1e20+ and float precision
// around ORIGIN_Y collapses — the whole view jitters.
function makeRoot(child) {
    if (!child || child.parent !== S.root) return false;
    const range = S.rootmax - S.rootmin;
    const newMax = S.rootmin + range * child.hbnd / NORM;
    const newMin = S.rootmin + range * child.lbnd / NORM;
    S.oldRoots.push(S.root);
    if (S.oldRoots.length > 64) S.oldRoots.shift();
    S.rootmin = newMin;
    S.rootmax = newMax;
    child.parent = null;
    S.root = child;
    expandNode(S.root);
    return true;
}

function reparentRoot() {
    if (!S.oldRoots.length) return false;
    const parent = S.oldRoots.pop();
    const lower = S.root.lbnd;
    const upper = S.root.hbnd;
    const nodeRange = upper - lower;
    if (nodeRange <= 0) return false;

    // Put current root back under its parent
    S.root.parent = parent;
    if (parent.children) {
        const idx = parent.children.findIndex(c => c.token === S.root.token && c.lbnd === lower);
        if (idx >= 0) parent.children[idx] = S.root;
    }

    const rootWidth = S.rootmax - S.rootmin;
    S.rootmax = S.rootmax + ((NORM - upper) * rootWidth) / nodeRange;
    S.rootmin = S.rootmin - (lower * rootWidth) / nodeRange;
    S.root = parent;
    return true;
}

function hasSpaceAroundRoot() {
    // Match DasherViewSquare: if the root does not cover the visible
    // rectangle, siblings (or parent) should be brought back on screen.
    const topLeft = screen2Dasher(0, 0);
    const bottomRight = screen2Dasher(canvas.width, canvas.height);
    const visibleMinY = topLeft.y;
    const visibleMaxY = bottomRight.y;
    const visibleMaxX = topLeft.x;
    const range = S.rootmax - S.rootmin;
    return range < visibleMaxX ||
        S.rootmin > visibleMinY ||
        S.rootmax < visibleMaxY;
}

function stabilizeRoots() {
    // Zooming out / over-promotion: pop roots until the current root
    // fills the view (brings siblings back into the empty quadrants).
    let guard = 0;
    while (hasSpaceAroundRoot() && guard++ < 32) {
        if (!reparentRoot()) break;
    }

    // Zooming in: promote only when a single child remains on screen
    // (classic onlyChildRendered). Promoting earlier hides siblings and
    // leaves blank regions like the empty top-right in long strings.
    guard = 0;
    while (guard++ < 32) {
        if (!S.root.children) break;

        const span = S.rootmax - S.rootmin;
        const force = span > 1e9; // numerical safety only

        let covering = null;
        let visible = 0;
        for (const ch of S.root.children) {
            const b = childBounds(ch, S.rootmin, S.rootmax);
            const h = (b.y2 - b.y1) * S.scaleY;
            if (h < MIN_PX) continue;
            const top = canvas.height / 2 + (b.y1 - ORIGIN_Y) * S.scaleY;
            const bot = canvas.height / 2 + (b.y2 - ORIGIN_Y) * S.scaleY;
            if (bot < 0 || top > canvas.height) continue;
            visible++;
            if (b.y1 < ORIGIN_Y && b.y2 > ORIGIN_Y && (b.y2 - b.y1) > ORIGIN_X) {
                covering = ch;
            }
        }
        if (!covering) break;

        // Promote iff this is the only on-screen child (or span has exploded)
        if (force || visible <= 1) {
            if (!makeRoot(covering)) break;
        } else {
            break;
        }
    }
}

// ── View transforms ───────────────────────────────────────────────────────────

function updateScales() {
    const W = canvas.width, H = canvas.height;
    // Isotropic scale: Dasher width≡height must stay square on screen,
    // otherwise children sit in a thin strip and nesting does not read.
    const scale = Math.min(W, H) / MAX_Y;
    S.scaleX = scale;
    S.scaleY = scale;
    // Crosshair is wherever ORIGIN_X lands (centre on a square canvas)
    S.crossX = W - ORIGIN_X * scale;
    S.crossY = H / 2;
}

function dasher2Screen(dx, dy) {
    return {
        x: canvas.width - dx * S.scaleX,
        y: canvas.height / 2 + (dy - ORIGIN_Y) * S.scaleY,
    };
}

function screen2Dasher(sx, sy) {
    return {
        x: (canvas.width - sx) / S.scaleX,
        y: ORIGIN_Y + (sy - canvas.height / 2) / S.scaleY,
    };
}

// ── Zoom dynamics (MacKay / Dasher scheduleOneStep) ───────────────────────────
// target = [Y − X, Y + X]; mouse right of crosshair ⇒ small X ⇒ zoom in.

function scheduleOneStep(dasherX, dasherY) {
    const targetY1 = dasherY - dasherX;
    const targetY2 = dasherY + dasherX;
    const targetRange = targetY2 - targetY1;
    if (targetRange <= 0) return;

    const R1 = S.rootmin, R2 = S.rootmax;
    const r1 = MAX_Y * (R1 - targetY1) / targetRange;
    const r2 = MAX_Y * (R2 - targetY1) / targetRange;

    let m1 = r1 - R1;
    let m2 = r2 - R2;

    const sqrtTarget = Math.sqrt(targetRange);
    const sqrtMax = Math.sqrt(MAX_Y);
    const denom = sqrtMax * (N_STEPS - 1) + sqrtTarget;
    const alpha = sqrtTarget / denom;

    m1 *= alpha;
    m2 *= alpha;

    let newMin = R1 + m1;
    let newMax = R2 + m2;

    // Keep crosshair covered
    newMin = Math.min(newMin, ORIGIN_Y - 1);
    newMax = Math.max(newMax, ORIGIN_Y + 1);

    // Prevent pathological over-zoom
    if (newMax - newMin < MAX_Y / 4) {
        const c = (newMin + newMax) / 2;
        newMin = c - MAX_Y / 8;
        newMax = c + MAX_Y / 8;
    }

    S.rootmin = newMin;
    S.rootmax = newMax;
}

// ── Crosshair path → typed text ───────────────────────────────────────────────

function findPathAtCrosshair() {
    const path = [];
    function walk(node, y1, y2) {
        const range = y2 - y1;
        // Node covers crosshair if it spans ORIGIN_Y and is wide enough
        // (range > ORIGIN_X means left edge is left of the crosshair)
        if (range <= ORIGIN_X || y1 >= ORIGIN_Y || y2 <= ORIGIN_Y) return;
        if (node.token) path.push(node);
        if (!node.children) {
            const screenH = range * S.scaleY;
            if (screenH > EXPAND_PX) expandNode(node);
        }
        if (node.children) {
            for (const ch of node.children) {
                const b = childBounds(ch, y1, y2);
                if (b.y1 < ORIGIN_Y && b.y2 > ORIGIN_Y) {
                    walk(ch, b.y1, b.y2);
                    return;
                }
            }
        }
    }
    walk(S.root, S.rootmin, S.rootmax);
    return path;
}

function syncText() {
    const under = findPathAtCrosshair();
    S.path = under;
    // Tokens already promoted to root + nodes still under the crosshair
    const committed = S.oldRoots.filter(n => n.token);
    const nodes = committed.concat(under);
    const next = nodes.map(n => n.token).join('');
    if (next === S.text) return;
    S.text = next;
    S.charBits = nodes.map(n => n.bits);
    S.totalBits = S.charBits.reduce((a, b) => a + b, 0);
    updateDisplay();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderNode(node, y1, y2, depth) {
    const W = canvas.width, H = canvas.height;
    const range = y2 - y1;
    if (range <= 0) return;

    // Canonical nesting: left edge at dasherX = range, right edge at 0
    const left  = dasher2Screen(range, y1);
    const right = dasher2Screen(0, y2);
    const x = left.x;
    const y = left.y;
    const w = right.x - left.x;
    const h = right.y - left.y;

    if (h < MIN_PX || w < 1) return;
    if (x > W || x + w < 0 || y > H || y + h < 0) return;

    const covers = range > ORIGIN_X && y1 < ORIGIN_Y && y2 > ORIGIN_Y;

    // Fill — root gets a warm yellow like the GIF's outer shelf
    if (!node.token) {
        ctx.fillStyle = depth === 0 ? '#f6e58d' : '#e8e8e8';
    } else {
        ctx.fillStyle = colorFor(node.token);
    }
    ctx.fillRect(x, y, w, h);

    // Clear border so containment reads like the GIF
    ctx.strokeStyle = covers ? '#111' : 'rgba(0,0,0,0.45)';
    ctx.lineWidth = covers ? 2.5 : 1.25;
    ctx.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));

    // Label near the LEFT edge of this box (parent letter sits left of its children)
    if (node.token && h >= 11 && x < W - 4) {
        const label = node.token === ' ' ? '⎵' : node.token;
        const fs = clamp(h * 0.5, 11, 56);
        ctx.font = `bold ${fs}px "Trebuchet MS", "Segoe UI", sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#111';
        const tx = Math.max(2, x + 5);
        if (tx < W - 8) ctx.fillText(label, tx, y + h / 2);
    }

    // Expand / draw children (nested inside: smaller range ⇒ further right)
    if (!node.children && h > EXPAND_PX) expandNode(node);
    if (node.children && h > MIN_PX * 2) {
        for (const ch of node.children) {
            const b = childBounds(ch, y1, y2);
            renderNode(ch, b.y1, b.y2, depth + 1);
        }
    }
}

function render() {
    const W = canvas.width, H = canvas.height;
    if (W === 0 || H === 0) return;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, W, H);

    // Root (and nested children)
    renderNode(S.root, S.rootmin, S.rootmax, 0);

    // Crosshair at ORIGIN (must match scale mapping used for nesting)
    const origin = dasher2Screen(ORIGIN_X, ORIGIN_Y);
    S.crossX = origin.x;
    S.crossY = origin.y;
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(origin.x - 10, origin.y);
    ctx.lineTo(origin.x + 10, origin.y);
    ctx.stroke();
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Idle / paused hint (classic: start with click or Space)
    if (S.paused || S.mouseX === null) {
        const t = performance.now() / 700;
        const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
        const cx = (S.crossX + W) / 2;
        ctx.fillStyle = 'rgba(40,40,40,0.78)';
        ctx.fillRect(cx - 210, H / 2 - 52, 420, 104);
        if (S.paused) {
            ctx.fillStyle = '#81ecec';
            ctx.font = 'bold 15px "Trebuchet MS", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Paused — click canvas or press Space to go', cx, H / 2 - 18);
            ctx.fillStyle = '#fff';
            ctx.font = '12px "Trebuchet MS", sans-serif';
            ctx.fillText('Pointer right of centre zooms · left zooms out', cx, H / 2 + 6);
            ctx.fillText('Copy extracts the typed text to the clipboard', cx, H / 2 + 26);
            ctx.fillStyle = `rgba(129,236,236,${0.5 + pulse * 0.5})`;
            ctx.fillText('▶', cx - 180, H / 2 - 18);
        } else {
            ctx.fillStyle = '#81ecec';
            ctx.font = 'bold 14px "Trebuchet MS", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Move pointer right of the crosshair to zoom', cx, H / 2 - 18);
            ctx.fillStyle = '#fff';
            ctx.font = '12px "Trebuchet MS", sans-serif';
            ctx.fillText('Boxes nest inside parents and stream left', cx, H / 2 + 4);
            ctx.fillText('Click or Space pauses · Copy extracts text', cx, H / 2 + 24);
            ctx.fillStyle = `rgba(129,236,236,${0.5 + pulse * 0.5})`;
            ctx.fillText('▶▶▶', cx + 170, H / 2 - 18);
        }
    }
}

// ── Animation ─────────────────────────────────────────────────────────────────

function tick() {
    if (!S.paused && S.mouseX !== null && S.mouseY !== null) {
        const d = screen2Dasher(S.mouseX, S.mouseY);
        // Clamp dasherX so extreme left still zooms out gracefully
        const dx = clamp(d.x, 1, MAX_Y * 2);
        scheduleOneStep(dx, d.y);
        stabilizeRoots();
        syncText();
    }
    render();
    requestAnimationFrame(tick);
}

// ── Display / controls ────────────────────────────────────────────────────────

function updateDisplay() {
    const el = id => document.getElementById(id);
    const te = el('dasher-text');
    const be = el('dasher-bits');
    const ae = el('dasher-avgbits');
    const ee = el('dasher-entropy');
    if (te) te.textContent = (S.text || '').replace(/ /g, '⎵') + '▋';
    if (be) be.textContent = S.totalBits.toFixed(1);
    if (ae) ae.textContent = S.text.length > 0
        ? (S.totalBits / S.text.length).toFixed(2) : '—';
    if (ee) ee.textContent = entropy(getProbs(S.text)).toFixed(2);
    syncPauseButton();
}

function syncPauseButton() {
    const btn = document.getElementById('dasher-pause');
    if (!btn) return;
    btn.textContent = S.paused ? 'Go' : 'Pause';
    btn.setAttribute('aria-pressed', S.paused ? 'true' : 'false');
}

function setPaused(paused) {
    S.paused = !!paused;
    syncPauseButton();
}

function togglePause() {
    setPaused(!S.paused);
}

function copyText() {
    const text = S.text || '';
    const btn = document.getElementById('dasher-copy');
    const done = (ok) => {
        if (!btn) return;
        const prev = btn.textContent;
        btn.textContent = ok ? 'Copied' : 'Copy failed';
        setTimeout(() => { btn.textContent = prev; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => done(true)).catch(() => done(false));
        return;
    }
    // Fallback for file:// / older browsers
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        done(ok);
    } catch (err) {
        done(false);
    }
}

function deleteChar() {
    // Zoom out by stepping toward a large-X (leftward) target a few times
    if (S.text.length === 0) return;
    const wasPaused = S.paused;
    S.paused = true; // freeze live zoom while we surgically unwrite
    const targetLen = S.text.length - 1;
    for (let i = 0; i < 40 && S.text.length > targetLen; i++) {
        scheduleOneStep(ORIGIN_X * 2.5, ORIGIN_Y);
        stabilizeRoots();
        syncText();
    }
    S.paused = wasPaused;
    syncPauseButton();
}

function resetAll() {
    initRoot();
    setPaused(true);
    updateDisplay();
    render();
}

function resizeCanvas() {
    const r = canvas.getBoundingClientRect();
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
    } else {
        canvas.width = window.innerWidth || 800;
        canvas.height = Math.max(300, (window.innerHeight || 600) - 90);
    }
    updateScales();
}

window.addEventListener('resize', () => { resizeCanvas(); render(); });

canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    S.mouseX = (e.clientX - r.left) * (canvas.width  / r.width);
    S.mouseY = (e.clientY - r.top)  * (canvas.height / r.height);
});

canvas.addEventListener('mouseleave', () => {
    S.mouseX = null;
    S.mouseY = null;
});

// Classic: click toggles start / pause
let ignoreClickUntil = 0;
canvas.addEventListener('click', e => {
    e.preventDefault();
    if (performance.now() < ignoreClickUntil) return;
    togglePause();
});

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    ignoreClickUntil = performance.now() + 600; // suppress ghost click
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    S.mouseX = (t.clientX - r.left) * (canvas.width  / r.width);
    S.mouseY = (t.clientY - r.top)  * (canvas.height / r.height);
    if (S.paused) setPaused(false);
}, { passive: false });

canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    const t = e.touches[0];
    S.mouseX = (t.clientX - r.left) * (canvas.width  / r.width);
    S.mouseY = (t.clientY - r.top)  * (canvas.height / r.height);
}, { passive: false });

canvas.addEventListener('touchend', () => {
    S.mouseX = null;
    S.mouseY = null;
});

document.addEventListener('keydown', e => {
    if (e.key === ' ' || e.code === 'Space') {
        // Don't steal Space from real form fields
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
        e.preventDefault();
        togglePause();
        return;
    }
    if (e.key === 'Backspace') { e.preventDefault(); deleteChar(); }
    if (e.key === 'Escape')    { e.preventDefault(); resetAll(); }
});

function defaultLmUrl() {
    // Prefer an explicit URL on the canvas; else sibling dasher-lm.json
    const explicit = canvas.getAttribute('data-dasher-lm');
    if (explicit) return explicit;
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
        const src = scripts[i].src || '';
        if (/dasher\.js(\?|$)/.test(src)) {
            return src.replace(/dasher\.js(\?.*)?$/, 'dasher-lm.json');
        }
    }
    return 'dasher-lm.json';
}

function loadLanguageModelFromUrl(url) {
    return fetch(url, { cache: 'no-store' })
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(spec => applyLanguageModel(spec, { reset: true }))
        .catch(err => {
            console.warn('Dasher: could not load language model from', url, err);
            return getLanguageModel();
        });
}

const resetBtn = document.getElementById('dasher-reset');
if (resetBtn) resetBtn.addEventListener('click', resetAll);

const pauseBtn = document.getElementById('dasher-pause');
if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

const copyBtn = document.getElementById('dasher-copy');
if (copyBtn) copyBtn.addEventListener('click', copyText);

function boot() {
    resizeCanvas();
    initRoot();
    setPaused(true);
    updateDisplay();
    render();
    requestAnimationFrame(tick);

    // Overlay defaults with dasher-lm.json when available (HTTP hosts)
    loadLanguageModelFromUrl(defaultLmUrl());
}

// Public API for updating / inspecting the model
window.Dasher = {
    setLanguageModel: applyLanguageModel,
    getLanguageModel: getLanguageModel,
    trainFromText: trainFromText,
    reset: resetAll,
    pause: () => setPaused(true),
    go: () => setPaused(false),
    togglePause: togglePause,
    getText: () => S.text,
};

if (document.readyState === 'complete') {
    requestAnimationFrame(boot);
} else {
    window.addEventListener('load', () => requestAnimationFrame(boot));
}

})();
