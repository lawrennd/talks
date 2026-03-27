// Copyright (c) 2026 Neil D. Lawrence
//
// Dasher: continuous-zoom arithmetic coding visualiser.
// Inspired by David MacKay's Dasher interface (MacKay 2003).
// Screen space is proportional to probability, so common characters
// are large targets — ease of selection mirrors information content.
//
// Usage: move mouse RIGHT of centre to zoom toward the letter at
//        your vertical position.  Move LEFT to zoom out / undo.
//        Each character is committed when you zoom in close enough.
//        Backspace removes the last character; Escape resets.
//
// Expected DOM elements (all IDs prefixed "dasher-"):
//   dasher-canvas    <canvas>  – the main zooming viewport
//   dasher-text      <span>    – typed text display
//   dasher-bits      <span>    – total bits consumed
//   dasher-avgbits   <span>    – average bits per character
//   dasher-entropy   <span>    – H(next | context) in bits
//   dasher-reset     <button>  – reset everything

(function () {
'use strict';

// ── Language model ────────────────────────────────────────────────────────────
//
// Source: approximate English letter-frequency tables.
//   UNI  – unigram probabilities (single-character frequencies)
//          from standard published English text statistics (Norvig/Brown corpus
//          approximations).  Space is treated as the 27th character.
//   BI   – conditional bigram distributions for the 13 most common characters.
//          These are hand-smoothed approximations; a production system would
//          use trained n-gram or neural language model probabilities.
//   BIGRAM_WEIGHT – when a bigram entry exists, blend bigram (82%) + unigram (18%)
//          so rare contexts degrade gracefully to unigram statistics.

const CHARS = ' abcdefghijklmnopqrstuvwxyz';

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

function buildDist(probs) {
    const arr = Object.entries(probs)
        .map(([char, prob]) => ({ char, prob, bits: -Math.log2(prob) }))
        .sort((a, b) => b.prob - a.prob);
    let cum = 0;
    for (const x of arr) { x.cumLow = cum; x.cumHigh = cum + x.prob; cum = x.cumHigh; }
    return arr;
}

function entropy(probs) {
    return Object.values(probs).reduce((H, p) => p > 0 ? H - p * Math.log2(p) : H, 0);
}

// ── Sub-distribution cache ────────────────────────────────────────────────────
// Keys are single characters; cache is invalidated whenever S.text changes.
// getSubDist(c) returns buildDist(getProbs(S.text + c)).
let subDistCache = {};
function getSubDist(char) {
    if (!subDistCache[char]) {
        subDistCache[char] = buildDist(getProbs(S.text + char));
    }
    return subDistCache[char];
}
function clearSubCache() { subDistCache = {}; }

// Band colours — bright HSL palette so bands are clearly visible on any background
const BAND_COLORS = [
    '#e74c3c','#e67e22','#f1c40f','#2ecc71','#1abc9c',
    '#3498db','#9b59b6','#e91e63','#00bcd4','#8bc34a',
    '#ff5722','#607d8b','#795548','#ff9800','#4caf50',
    '#2196f3','#673ab7','#f44336','#009688','#cddc39',
    '#ff6f00','#0288d1','#558b2f','#ad1457','#00838f',
    '#6a1b9a','#37474f'
];

// Assign a fixed bright colour to each character so it stays consistent
const CHAR_COLOR = {};
(function () {
    const sorted = Array.from(CHARS).sort(); // stable alphabetical order
    sorted.forEach((ch, i) => { CHAR_COLOR[ch] = BAND_COLORS[i % BAND_COLORS.length]; });
})();

// ── State ─────────────────────────────────────────────────────────────────────

const S = {
    text:      '',
    totalBits: 0,
    charBits:  [],
    probs:     null,
    dist:      null,
    viewMin:   0,
    viewMax:   1,
    mouseX:    null,
    mouseY:    null,
    flash:     0,
    lastChar:  '',
};

// ── Canvas ────────────────────────────────────────────────────────────────────

const canvas = document.getElementById('dasher-canvas');
if (!canvas) { return; }
const ctx = canvas.getContext('2d');

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// Use getBoundingClientRect so we measure the actual CSS-rendered size,
// not the flex-computed clientWidth/Height which can be 0 at parse time.
function resizeCanvas() {
    const r = canvas.getBoundingClientRect();
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    // Only update if we have real dimensions to avoid clearing mid-paint
    if (w > 0 && h > 0) {
        canvas.width  = w;
        canvas.height = h;
    } else {
        // Hard fallback: occupy the viewport minus rough header/footer
        canvas.width  = window.innerWidth  || 800;
        canvas.height = Math.max(300, (window.innerHeight || 600) - 90);
    }
}

window.addEventListener('resize', () => { resizeCanvas(); render(); });

// ── Layout ────────────────────────────────────────────────────────────────────

// NOW_FRAC: commitment line (typed chars live to its left)
// BAND_FRAC: where probability bands begin (right 70% of canvas)
const NOW_FRAC  = 0.20;
const BAND_FRAC = 0.28;

function layout(W) {
    return { nowX: W * NOW_FRAC, bandLeft: W * BAND_FRAC };
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function render() {
    const W = canvas.width, H = canvas.height;
    if (W === 0 || H === 0) return;

    const { nowX, bandLeft } = layout(W);
    const bandW  = W - bandLeft;
    const vRange = S.viewMax - S.viewMin;

    // ── Background ──────────────────────────────────────────────────────────
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);

    // Slightly lighter background in band zone so bands show as solid colour
    ctx.fillStyle = '#16213e';
    ctx.fillRect(bandLeft, 0, bandW, H);

    // ── Probability bands (two-level fractal) ────────────────────────────────
    // Each band's LEFT portion shows the parent character label.
    // Each band's RIGHT portion shows the next-level sub-distribution —
    // i.e. P(next | context + this_char) — creating the recursive/fractal
    // structure that is the core of arithmetic-coding navigation.
    const LABEL_W_PX = 56; // fixed pixel width reserved for parent label

    if (S.dist && vRange > 0) {
        for (const item of S.dist) {
            if (item.cumHigh <= S.viewMin || item.cumLow >= S.viewMax) continue;

            const vLow  = Math.max(item.cumLow,  S.viewMin);
            const vHigh = Math.min(item.cumHigh, S.viewMax);
            const sTop  = ((vLow  - S.viewMin) / vRange) * H;
            const sBot  = ((vHigh - S.viewMin) / vRange) * H;
            const natH  = sBot - sTop;
            const bh    = Math.max(natH, 4);
            const midY  = sTop + natH / 2;

            const col   = CHAR_COLOR[item.char] || '#888';
            const aimed = S.mouseY !== null && S.mouseY >= sTop && S.mouseY < sTop + bh;
            const lz    = Math.min(LABEL_W_PX, bandW * 0.18); // label zone width

            // Subtle full-width background tint (gives the band a colour identity)
            ctx.globalAlpha = aimed ? 0.18 : 0.10;
            ctx.fillStyle   = col;
            ctx.fillRect(bandLeft, sTop, bandW, bh);
            ctx.globalAlpha = 1;

            // Solid label zone (left portion of band)
            ctx.globalAlpha = aimed ? 0.90 : 0.65;
            ctx.fillStyle   = col;
            ctx.fillRect(bandLeft, sTop, lz, bh);
            ctx.globalAlpha = 1;

            // Left-edge accent stripe
            ctx.fillStyle = col;
            ctx.fillRect(bandLeft, sTop, aimed ? 5 : 3, bh);

            // ── Sub-distribution (fractal interior) ─────────────────────────
            // Shown when the parent band is tall enough to host children.
            // The sub-bands are placed inside the right portion of the parent
            // band, each sub-band height ∝ P(next_char | context + parent_char).
            if (natH >= 28) {
                const subX = bandLeft + lz + 2;
                const subW = W - subX - 1;

                ctx.save();
                ctx.beginPath();
                ctx.rect(subX, sTop, subW, bh);
                ctx.clip();

                const subDist = getSubDist(item.char);
                let   cumY    = sTop;
                for (const sc of subDist) {
                    const scH = sc.prob * bh;
                    if (scH < 1.5) break; // sorted descending; rest are smaller

                    const scCol = CHAR_COLOR[sc.char] || '#888';
                    ctx.globalAlpha = aimed ? 0.80 : 0.62;
                    ctx.fillStyle   = scCol;
                    ctx.fillRect(subX, cumY, subW, scH);
                    ctx.globalAlpha = 1;

                    // Thin separator between sub-bands
                    ctx.fillStyle = '#16213e';
                    ctx.fillRect(subX, cumY + scH - 1, subW, 1);

                    // Sub-character label (when sub-band is tall enough)
                    if (scH >= 9) {
                        const sfs = clamp(scH * 0.58, 7, 20);
                        ctx.font         = `bold ${sfs}px "Courier New", monospace`;
                        ctx.textBaseline = 'middle';
                        ctx.textAlign    = 'left';
                        ctx.fillStyle    = '#ffffffee';
                        ctx.fillText(sc.char === ' ' ? '⎵' : sc.char,
                            subX + 5, cumY + scH / 2);
                        // Sub-band probability (right-aligned, if wide enough)
                        if (scH >= 14 && subW > 80) {
                            ctx.font      = `${clamp(scH * 0.30, 7, 12)}px "Courier New", monospace`;
                            ctx.textAlign = 'right';
                            ctx.fillStyle = '#ffffffaa';
                            ctx.fillText((sc.prob * 100).toFixed(1) + '%',
                                subX + subW - 6, cumY + scH / 2);
                        }
                    }
                    cumY += scH;
                }
                ctx.restore();
            }

            // Band separator
            ctx.fillStyle = '#16213e';
            ctx.fillRect(bandLeft, sTop + bh - 1, bandW, 1);

            // Parent character label (drawn on top, centred in label zone)
            if (bh >= 10) {
                const fs = clamp(natH * 0.65, 9, 48);
                ctx.font         = `bold ${fs}px "Courier New", monospace`;
                ctx.textBaseline = 'middle';
                ctx.textAlign    = 'center';
                ctx.fillStyle    = '#ffffff';
                ctx.fillText(item.char === ' ' ? '⎵' : item.char,
                    bandLeft + lz / 2, midY);
            }

            // Parent probability percentage (below label, if band is tall)
            if (bh >= 22) {
                const pfs = clamp(natH * 0.26, 7, 12);
                ctx.font         = `${pfs}px "Courier New", monospace`;
                ctx.textBaseline = 'middle';
                ctx.textAlign    = 'center';
                ctx.fillStyle    = '#ffffffcc';
                ctx.fillText((item.prob * 100).toFixed(1) + '%',
                    bandLeft + lz / 2, midY + clamp(natH * 0.38, 8, 28));
            }
        }
    }

    // ── "Now" commitment line ──────────────────────────────────────────────
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth   = 2;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(nowX, 0);
    ctx.lineTo(nowX, H);
    ctx.stroke();

    // Arrow marker on the commitment line
    ctx.fillStyle = '#4ecdc4';
    ctx.beginPath();
    ctx.moveTo(nowX,      H * 0.5 - 9);
    ctx.lineTo(nowX + 12, H * 0.5);
    ctx.lineTo(nowX,      H * 0.5 + 9);
    ctx.closePath();
    ctx.fill();

    // ── Typed text (left of commitment line) ──────────────────────────────
    if (S.text.length > 0) {
        const disp = S.text.replace(/ /g, '⎵');
        ctx.font         = 'bold 16px "Courier New", monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'right';
        ctx.fillStyle    = '#4ecdc4';
        ctx.fillText(disp, nowX - 10, H / 2);
    }

    // ── Mouse crosshair and speed arrow ───────────────────────────────────
    if (S.mouseX !== null && S.mouseY !== null) {
        const mx = S.mouseX, my = S.mouseY;

        // Horizontal aim line across band zone
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(bandLeft, my);
        ctx.lineTo(W, my);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow at nowX showing direction and speed
        const spd    = clamp((mx - W / 2) / (W / 2), -1, 1);
        const alpha  = clamp(Math.abs(spd) * 0.9 + 0.1, 0.1, 1);
        const aSize  = clamp(Math.abs(spd) * 18, 4, 18);
        const dir    = spd >= 0 ? 1 : -1;

        ctx.fillStyle = `rgba(78,205,196,${alpha})`;
        ctx.beginPath();
        if (dir > 0) {
            ctx.moveTo(nowX + 2,          my);
            ctx.lineTo(nowX + 2 + aSize,  my - aSize * 0.6);
            ctx.lineTo(nowX + 2 + aSize,  my + aSize * 0.6);
        } else {
            ctx.moveTo(nowX - 2,          my);
            ctx.lineTo(nowX - 2 - aSize,  my - aSize * 0.6);
            ctx.lineTo(nowX - 2 - aSize,  my + aSize * 0.6);
        }
        ctx.closePath();
        ctx.fill();

        // Cursor dot
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
    }

    // ── Commit flash ──────────────────────────────────────────────────────
    if (S.flash > 0) {
        const a = S.flash / 30;
        ctx.fillStyle = `rgba(78,205,196,${a * 0.3})`;
        ctx.fillRect(0, 0, W, H);
        if (S.lastChar && S.flash > 12) {
            const fs = clamp(H * 0.25, 32, 80);
            ctx.font         = `bold ${fs}px "Courier New", monospace`;
            ctx.textBaseline = 'middle';
            ctx.textAlign    = 'center';
            ctx.fillStyle    = `rgba(255,255,255,${a})`;
            ctx.fillText(S.lastChar === ' ' ? '⎵' : S.lastChar, nowX / 2, H / 2);
        }
        S.flash = Math.max(0, S.flash - 1);
    }

    // ── Zoom depth indicator ──────────────────────────────────────────────
    const zoom = Math.round(1 / vRange);
    ctx.font         = '10px "Courier New", monospace';
    ctx.textBaseline = 'top';
    ctx.textAlign    = 'right';
    ctx.fillStyle    = '#4ecdc466';
    ctx.fillText('×' + zoom, W - 6, 5);

    // ── Idle hint (pulsing, shown when mouse is outside canvas) ───────────
    if (S.mouseX === null) {
        const t     = performance.now() / 700;
        const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
        const cx    = (nowX + W) / 2;
        const cy    = H / 2;

        // Frosted-glass backdrop
        ctx.fillStyle = 'rgba(22,33,62,0.85)';
        ctx.beginPath();
        ctx.rect(cx - 230, cy - 56, 460, 112);
        ctx.fill();

        ctx.strokeStyle = 'rgba(78,205,196,0.4)';
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Main instruction
        ctx.font         = 'bold 15px "Courier New", monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#4ecdc4';
        ctx.fillText('Move mouse here', cx, cy - 30);

        ctx.font      = '12px "Courier New", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Drift RIGHT  →  zoom in  (select a letter)', cx, cy - 8);
        ctx.fillText('Drift LEFT   ←  zoom out (undo)', cx, cy + 12);
        ctx.fillText('Vertical position aims at a letter', cx, cy + 32);

        // Pulsing arrow
        ctx.font      = `bold ${Math.round(16 + pulse * 4)}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(78,205,196,${0.5 + pulse * 0.5})`;
        ctx.fillText('▶▶▶', cx + 110, cy - 30);
    }
}

// ── Animation / zoom loop ─────────────────────────────────────────────────────

const ZOOM_SPEED    = 0.055;
const COMMIT_THRESH = 0.005;
const DEAD_FRAC     = 0.04;

function tick() {
    const W = canvas.width, H = canvas.height;

    if (S.mouseX !== null && S.mouseY !== null) {
        const speed = clamp((S.mouseX - W / 2) / (W / 2), -1.5, 1);

        if (Math.abs(speed) > DEAD_FRAC) {
            const adj    = speed > 0 ? speed - DEAD_FRAC : speed + DEAD_FRAC;
            const yFrac  = clamp(S.mouseY / H, 0, 1);
            const target = S.viewMin + (S.viewMax - S.viewMin) * yFrac;

            const factor   = Math.exp(-adj * ZOOM_SPEED);
            const newRange = (S.viewMax - S.viewMin) * factor;
            let   newMin   = target - newRange * yFrac;
            let   newMax   = target + newRange * (1 - yFrac);

            if (newMin < 0) { newMax = Math.min(1, newMax - newMin); newMin = 0; }
            if (newMax > 1) { newMin = Math.max(0, newMin - (newMax - 1)); newMax = 1; }
            S.viewMin = clamp(newMin, 0, 1);
            S.viewMax = clamp(newMax, 0, 1);

            checkCommit();
        }
    }
    // Always render — keeps idle-hint pulsing and drains flash
    render();
    requestAnimationFrame(tick);
}

// ── Commit logic ──────────────────────────────────────────────────────────────

function checkCommit() {
    if (S.viewMax - S.viewMin > COMMIT_THRESH) return;
    for (const item of S.dist) {
        if (item.cumLow  <= S.viewMin + 1e-6 &&
            item.cumHigh >= S.viewMax - 1e-6) {
            commitChar(item);
            return;
        }
    }
}

function commitChar(item) {
    S.text      += item.char;
    S.charBits.push(item.bits);
    S.totalBits += item.bits;
    S.lastChar   = item.char;
    S.flash      = 30;
    S.probs      = getProbs(S.text);
    S.dist       = buildDist(S.probs);
    S.viewMin    = 0;
    S.viewMax    = 1;
    clearSubCache();
    updateDisplay();
}

function deleteChar() {
    if (S.text.length === 0) return;
    S.text      = S.text.slice(0, -1);
    S.charBits.pop();
    S.totalBits = S.charBits.reduce((a, b) => a + b, 0);
    S.probs     = getProbs(S.text);
    S.dist      = buildDist(S.probs);
    S.viewMin   = 0;
    S.viewMax   = 1;
    clearSubCache();
    updateDisplay();
}

function resetAll() {
    S.text = ''; S.charBits = []; S.totalBits = 0;
    S.viewMin = 0; S.viewMax = 1;
    S.flash = 0; S.lastChar = '';
    S.probs = getProbs('');
    S.dist  = buildDist(S.probs);
    clearSubCache();
    updateDisplay();
    render();
}

// ── Display update ────────────────────────────────────────────────────────────

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
    if (ee && S.probs) ee.textContent = entropy(S.probs).toFixed(2);
}

// ── Events ────────────────────────────────────────────────────────────────────

canvas.addEventListener('mousemove', e => {
    const r  = canvas.getBoundingClientRect();
    S.mouseX = (e.clientX - r.left) * (canvas.width  / r.width);
    S.mouseY = (e.clientY - r.top)  * (canvas.height / r.height);
});

canvas.addEventListener('mouseleave', () => {
    S.mouseX = null;
    S.mouseY = null;
});

canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    const r  = canvas.getBoundingClientRect();
    const t  = e.touches[0];
    S.mouseX = (t.clientX - r.left) * (canvas.width  / r.width);
    S.mouseY = (t.clientY - r.top)  * (canvas.height / r.height);
}, { passive: false });

canvas.addEventListener('touchend', () => {
    S.mouseX = null;
    S.mouseY = null;
});

document.addEventListener('keydown', e => {
    if (e.key === 'Backspace') { e.preventDefault(); deleteChar(); }
    if (e.key === 'Escape')    { e.preventDefault(); resetAll();   }
});

const resetBtn = document.getElementById('dasher-reset');
if (resetBtn) resetBtn.addEventListener('click', resetAll);

// ── Boot ──────────────────────────────────────────────────────────────────────
// We wait for 'load' (all resources fetched) before measuring the canvas,
// then use a rAF so the first paint has committed flex/grid layout dimensions.

function boot() {
    resizeCanvas();
    S.probs = getProbs('');
    S.dist  = buildDist(S.probs);
    updateDisplay();
    render();
    requestAnimationFrame(tick);
}

if (document.readyState === 'complete') {
    // Script loaded after window.load fired — safe to measure immediately
    requestAnimationFrame(boot);
} else {
    window.addEventListener('load', () => requestAnimationFrame(boot));
}

})();
