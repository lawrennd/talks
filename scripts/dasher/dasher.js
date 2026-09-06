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
//   dasher-entropy, dasher-reset

(function () {
'use strict';

// ── Language model ────────────────────────────────────────────────────────────

const CHARS = 'abcdefghijklmnopqrstuvwxyz ';

const UNI = {
    ' ':0.183,'e':0.103,'t':0.074,'a':0.064,'o':0.062,'i':0.057,
    'n':0.055,'s':0.052,'h':0.047,'r':0.047,'d':0.034,'l':0.033,
    'u':0.023,'c':0.022,'m':0.020,'w':0.017,'f':0.016,'g':0.015,
    'y':0.015,'p':0.015,'b':0.011,'v':0.007,'k':0.006,'j':0.001,
    'x':0.001,'q':0.001,'z':0.001
};

const BI = {
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
};

const BIGRAM_WEIGHT = 0.82;

function getProbs(context) {
    const last = context.slice(-1).toLowerCase();
    const bg   = BI[last];
    const out  = {};
    for (const ch of CHARS) {
        const bp = (bg && bg[ch]) ? bg[ch] : 0;
        const up = UNI[ch] || 0.0001;
        out[ch]  = BIGRAM_WEIGHT * bp + (1 - BIGRAM_WEIGHT) * up;
    }
    const sum = Object.values(out).reduce((a, b) => a + b, 0);
    for (const ch of CHARS) out[ch] /= sum;
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
    let cum = 0;
    node.children = [];
    for (const ch of CHARS) {
        const p = probs[ch];
        const lo = Math.round(cum * NORM);
        cum += p;
        const hi = Math.round(cum * NORM);
        if (hi > lo) {
            node.children.push(makeNode(ch, lo, hi, node, node.context + ch));
        }
    }
    if (node.children.length) {
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
    // Visible Dasher-Y window is roughly [0, MAX_Y]; visible max X is left edge.
    const range = S.rootmax - S.rootmin;
    const visibleMaxX = canvas.width / S.scaleX;
    return range < visibleMaxX || S.rootmin > 0 || S.rootmax < MAX_Y;
}

function stabilizeRoots() {
    // Zooming out: pop roots until the current root fills the view again
    let guard = 0;
    while (hasSpaceAroundRoot() && guard++ < 32) {
        if (!reparentRoot()) break;
    }

    // Zooming in: push the unique on-screen child that covers the crosshair.
    // This is what keeps rootmin/rootmax from exploding (and the view from jittering).
    guard = 0;
    while (guard++ < 32) {
        if (!S.root.children) break;

        const span = S.rootmax - S.rootmin;
        // Hard safety if promotion lagged behind a fast zoom
        const force = span > 1e9;

        let covering = null;
        let visible = 0;
        for (const ch of S.root.children) {
            const b = childBounds(ch, S.rootmin, S.rootmax);
            const h = (b.y2 - b.y1) * S.scaleY;
            // Ignore hairline leftovers when deciding "only child"
            if (h < 8) continue;
            const top = canvas.height / 2 + (b.y1 - ORIGIN_Y) * S.scaleY;
            const bot = canvas.height / 2 + (b.y2 - ORIGIN_Y) * S.scaleY;
            if (bot < 0 || top > canvas.height) continue;
            visible++;
            if (b.y1 < ORIGIN_Y && b.y2 > ORIGIN_Y && (b.y2 - b.y1) > ORIGIN_X) {
                covering = ch;
            }
        }
        if (!covering) break;
        const b = childBounds(covering, S.rootmin, S.rootmax);
        const childRange = b.y2 - b.y1;
        if (force || ((visible <= 1 || childRange > MAX_Y) && childRange > ORIGIN_X)) {
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

    // Idle hint
    if (S.mouseX === null) {
        const t = performance.now() / 700;
        const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
        const cx = (S.crossX + W) / 2;
        ctx.fillStyle = 'rgba(40,40,40,0.78)';
        ctx.fillRect(cx - 200, H / 2 - 48, 400, 96);
        ctx.fillStyle = '#81ecec';
        ctx.font = 'bold 14px "Trebuchet MS", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Move pointer right of the crosshair to zoom', cx, H / 2 - 18);
        ctx.fillStyle = '#fff';
        ctx.font = '12px "Trebuchet MS", sans-serif';
        ctx.fillText('Boxes nest inside parents and stream left', cx, H / 2 + 4);
        ctx.fillText('Vertical position steers · left of crosshair zooms out', cx, H / 2 + 24);
        ctx.fillStyle = `rgba(129,236,236,${0.5 + pulse * 0.5})`;
        ctx.fillText('▶▶▶', cx + 170, H / 2 - 18);
    }
}

// ── Animation ─────────────────────────────────────────────────────────────────

function tick() {
    if (S.mouseX !== null && S.mouseY !== null) {
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
}

function deleteChar() {
    // Zoom out by stepping toward a large-X (leftward) target a few times
    if (S.text.length === 0) return;
    const targetLen = S.text.length - 1;
    for (let i = 0; i < 40 && S.text.length > targetLen; i++) {
        scheduleOneStep(ORIGIN_X * 2.5, ORIGIN_Y);
        stabilizeRoots();
        syncText();
    }
}

function resetAll() {
    initRoot();
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
    if (e.key === 'Backspace') { e.preventDefault(); deleteChar(); }
    if (e.key === 'Escape')    { e.preventDefault(); resetAll(); }
});

const resetBtn = document.getElementById('dasher-reset');
if (resetBtn) resetBtn.addEventListener('click', resetAll);

function boot() {
    resizeCanvas();
    initRoot();
    updateDisplay();
    render();
    requestAnimationFrame(tick);
}

if (document.readyState === 'complete') {
    requestAnimationFrame(boot);
} else {
    window.addEventListener('load', () => requestAnimationFrame(boot));
}

})();
