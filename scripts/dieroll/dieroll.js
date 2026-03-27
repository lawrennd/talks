// Copyright (c) 2026 Neil D. Lawrence
//
// DieRoll: interactive die-rolling simulation with configurable outcome
// probabilities and a live histogram.  Illustrates the maximum-entropy
// principle via Jaynes' dice example (average outcome ≠ 3.5).
//
// Expected DOM elements (all IDs prefixed "dieroll-"):
//   dieroll-die      <canvas width="180" height="180"> – the die face
//   dieroll-hist     <canvas width="500" height="260"> – histogram
//   dieroll-roll     <button>  – roll trigger
//   dieroll-reset    <button>  – clear history
//   dieroll-sliders  <div>     – slider rows built dynamically
//   dieroll-uniform  <button>  – preset: uniform
//   dieroll-jaynes   <button>  – preset: max-entropy mean 4.5
//   dieroll-low      <button>  – preset: max-entropy mean 2
//   dieroll-count    <span>    – total roll count display
//   dieroll-mean     <span>    – sample mean display
//   dieroll-entropy  <span>    – H(p) display

(function () {

// ── Pip positions (fractional x,y within die face, origin top-left) ──────────
const PIPS = {
    1: [[0.50, 0.50]],
    2: [[0.72, 0.28], [0.28, 0.72]],
    3: [[0.72, 0.28], [0.50, 0.50], [0.28, 0.72]],
    4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
    5: [[0.28, 0.28], [0.72, 0.28], [0.50, 0.50], [0.28, 0.72], [0.72, 0.72]],
    6: [[0.28, 0.22], [0.72, 0.22],
        [0.28, 0.50], [0.72, 0.50],
        [0.28, 0.78], [0.72, 0.78]]
};

const FACE_COLORS = [
    '#e74c3c', '#e67e22', '#f1c40f',
    '#2ecc71', '#3498db', '#9b59b6'
];

// ── State ─────────────────────────────────────────────────────────────────────
let rawWeights  = [1, 1, 1, 1, 1, 1];
let probs       = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6];
let counts      = [0, 0, 0, 0, 0, 0];
let totalRolls  = 0;
let currentFace = 1;
let animating   = false;

// ── Draw die face ─────────────────────────────────────────────────────────────
function drawDie(canvas, face, glow) {
    const ctx  = canvas.getContext('2d');
    const W    = canvas.width;
    const pad  = 16;
    const size = W - 2 * pad;
    const x    = pad, y = pad;
    const r    = 22;

    ctx.clearRect(0, 0, W, W);

    function roundRectPath() {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + size - r, y);
        ctx.quadraticCurveTo(x + size, y,        x + size, y + r);
        ctx.lineTo(x + size, y + size - r);
        ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
        ctx.lineTo(x + r, y + size);
        ctx.quadraticCurveTo(x, y + size,        x, y + size - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y,               x + r, y);
        ctx.closePath();
    }

    // Drop shadow
    ctx.save();
    ctx.shadowColor   = glow ? 'rgba(240,200,60,0.55)' : 'rgba(0,0,0,0.55)';
    ctx.shadowBlur    = glow ? 22 : 16;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;

    // Die body (ivory gradient)
    const grad = ctx.createLinearGradient(x, y, x + size, y + size);
    grad.addColorStop(0, glow ? '#fffbe8' : '#fffef5');
    grad.addColorStop(1, glow ? '#f0dda0' : '#e8e4d0');
    roundRectPath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Border
    roundRectPath();
    ctx.strokeStyle = glow ? '#c8a020' : '#b0a070';
    ctx.lineWidth   = 2;
    ctx.stroke();

    // Subtle bevel highlight (top-left edge)
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 2;
    const bev = 6;
    ctx.beginPath();
    ctx.moveTo(x + r, y + bev); ctx.lineTo(x + size - r, y + bev);
    ctx.moveTo(x + bev, y + r); ctx.lineTo(x + bev, y + size - r);
    ctx.stroke();
    ctx.restore();

    // Pips
    const pipR = 10.5;
    for (const [fx, fy] of PIPS[face]) {
        const px = x + fx * size;
        const py = y + fy * size;
        ctx.save();
        ctx.shadowColor   = 'rgba(0,0,0,0.40)';
        ctx.shadowBlur    = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1.5;
        const pg = ctx.createRadialGradient(px - 1.5, py - 1.5, 1, px, py, pipR);
        pg.addColorStop(0, '#3a1a1a');
        pg.addColorStop(1, '#100808');
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, pipR, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

// ── Draw tiny pip-pattern icon (for histogram x-axis labels) ─────────────────
function drawMiniPip(ctx, face, cx, cy, r) {
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.fillStyle   = '#999';
    for (const [fx, fy] of PIPS[face]) {
        const px = cx + (fx - 0.5) * r * 7;
        const py = cy + (fy - 0.5) * r * 7;
        ctx.beginPath();
        ctx.arc(px, py, r * 0.55, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.restore();
}

// ── Sample from probability distribution ──────────────────────────────────────
function sampleOutcome() {
    const r = Math.random();
    let cum = 0;
    for (let i = 0; i < 6; i++) {
        cum += probs[i];
        if (r <= cum) return i + 1;
    }
    return 6;
}

// ── Roll animation (decelerating face sequence) ───────────────────────────────
function rollAnimation(finalFace, callback) {
    animating = true;
    const rollBtn = document.getElementById('dieroll-roll');
    if (rollBtn) rollBtn.disabled = true;

    const canvas     = document.getElementById('dieroll-die');
    const totalSteps = 14;
    let   step       = 0;

    // Pre-build sequence ending on the actual result
    const sequence = [];
    for (let s = 0; s < totalSteps - 1; s++) {
        let f;
        do { f = Math.floor(Math.random() * 6) + 1; } while (f === (sequence[s - 1] ?? currentFace));
        sequence.push(f);
    }
    sequence.push(finalFace);

    function tick() {
        currentFace = sequence[step];
        drawDie(canvas, currentFace, step >= totalSteps - 2);
        step++;
        if (step < totalSteps) {
            // Ease-out cadence: 35 ms → 280 ms
            const t     = step / totalSteps;
            const delay = 35 + t * t * 250;
            setTimeout(tick, delay);
        } else {
            animating = false;
            if (rollBtn) rollBtn.disabled = false;
            callback && callback();
        }
    }
    tick();
}

// ── Draw histogram ─────────────────────────────────────────────────────────────
function drawHistogram() {
    const canvas = document.getElementById('dieroll-hist');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0f1729';
    ctx.fillRect(0, 0, W, H);

    const padL = 50, padR = 18, padT = 28, padB = 52;
    const cW   = W - padL - padR;
    const cH   = H - padT - padB;

    const barW   = cW / 6;
    const barPad = barW * 0.18;
    const bw     = barW - 2 * barPad;

    // Scale y-axis to the larger of theory or observed
    const maxFreq = Math.max(
        ...probs,
        totalRolls > 0 ? Math.max(...counts) / totalRolls : 0,
        0.01
    );
    const yScale = cH / (maxFreq * 1.10);

    // Grid lines
    ctx.lineWidth   = 0.8;
    const nGrid = 4;
    for (let g = 1; g <= nGrid; g++) {
        const yp = padT + cH - (g / nGrid) * cH;
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.beginPath();
        ctx.moveTo(padL, yp); ctx.lineTo(W - padR, yp);
        ctx.stroke();
    }

    for (let i = 0; i < 6; i++) {
        const bx = padL + i * barW + barPad;

        // Theoretical probability (dashed outline)
        const thH = probs[i] * yScale;
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = FACE_COLORS[i] + '66';
        ctx.lineWidth   = 1.5;
        ctx.strokeRect(bx, padT + cH - thH, bw, thH);
        ctx.restore();

        // Observed relative-frequency bar
        if (totalRolls > 0) {
            const relFreq = counts[i] / totalRolls;
            const barH    = relFreq * yScale;
            const col     = FACE_COLORS[i];

            const grad = ctx.createLinearGradient(0, padT + cH - barH, 0, padT + cH);
            grad.addColorStop(0, col + 'dd');
            grad.addColorStop(1, col + '55');
            ctx.fillStyle = grad;
            ctx.fillRect(bx, padT + cH - barH, bw, barH);

            // Frequency label above bar
            ctx.fillStyle    = '#ccc';
            ctx.font         = 'bold 10px monospace';
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(
                (relFreq * 100).toFixed(1) + '%',
                bx + bw / 2,
                padT + cH - barH - 3
            );
        }

        // Face number below x-axis
        ctx.fillStyle    = '#aaa';
        ctx.font         = '13px Georgia, serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(String(i + 1), bx + bw / 2, padT + cH + 6);

        // Count
        ctx.fillStyle = '#666';
        ctx.font      = '10px monospace';
        ctx.fillText(String(counts[i]), bx + bw / 2, padT + cH + 22);

        // Mini pip icon
        drawMiniPip(ctx, i + 1, bx + bw / 2, padT + cH + 40, 7);
    }

    // Axes
    ctx.strokeStyle = '#334';
    ctx.lineWidth   = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + cH);
    ctx.lineTo(W - padR, padT + cH);
    ctx.stroke();

    // Y-axis tick labels
    ctx.fillStyle    = '#556';
    ctx.font         = '9px monospace';
    ctx.textAlign    = 'right';
    ctx.textBaseline = 'middle';
    for (let g = 0; g <= nGrid; g++) {
        const frac = g / nGrid;
        const yp   = padT + cH * (1 - frac);
        ctx.fillText((frac * maxFreq * 1.10).toFixed(2), padL - 4, yp);
    }

    // Y-axis label
    ctx.save();
    ctx.fillStyle    = '#667';
    ctx.font         = '10px sans-serif';
    ctx.textAlign    = 'center';
    ctx.translate(12, padT + cH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Relative frequency', 0, 0);
    ctx.restore();

    // Chart title
    ctx.fillStyle    = '#556';
    ctx.font         = '10px sans-serif';
    ctx.textAlign    = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Outcome histogram', padL, 5);

    // Legend: dashed = theoretical
    ctx.textAlign = 'right';
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(200,200,200,0.5)';
    ctx.lineWidth   = 1.5;
    ctx.beginPath();
    ctx.moveTo(W - padR - 120, 12); ctx.lineTo(W - padR - 100, 12);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = '#667';
    ctx.fillText('theoretical p', W - padR - 96, 5);
}

// ── Probability management ────────────────────────────────────────────────────
function rebuildProbs() {
    const total = rawWeights.reduce((a, b) => a + b, 0);
    probs = total === 0
        ? [1/6, 1/6, 1/6, 1/6, 1/6, 1/6]
        : rawWeights.map(w => w / total);

    for (let i = 0; i < 6; i++) {
        const el = document.getElementById(`dieroll-pval-${i}`);
        if (el) el.textContent = probs[i].toFixed(3);
    }

    let H = 0;
    for (const p of probs) if (p > 0) H -= p * Math.log2(p);
    const hEl = document.getElementById('dieroll-entropy');
    if (hEl) hEl.textContent = H.toFixed(3) + ' bits';

    drawHistogram();
}

// ── Maximum-entropy distribution with a given mean (exponential family) ───────
// Solves: p_i ∝ exp(λ·i), i=1..6 such that Σ i·p_i = targetMean
function maxEntropyDist(targetMean) {
    function meanForLambda(lam) {
        const w = [1,2,3,4,5,6].map(i => Math.exp(lam * i));
        const Z = w.reduce((a, b) => a + b, 0);
        return w.reduce((acc, wi, idx) => acc + wi * (idx + 1), 0) / Z;
    }
    let lo = -5, hi = 5;
    for (let iter = 0; iter < 80; iter++) {
        const mid = (lo + hi) / 2;
        if (meanForLambda(mid) < targetMean) lo = mid; else hi = mid;
    }
    const lam = (lo + hi) / 2;
    return [1,2,3,4,5,6].map(i => Math.exp(lam * i));
}

function setWeights(ws) {
    rawWeights = [...ws];
    const maxW = Math.max(...ws, 1e-9);
    for (let i = 0; i < 6; i++) {
        const s = document.getElementById(`dieroll-pslider-${i}`);
        if (s) s.value = (ws[i] / maxW * 10).toString();
    }
    rebuildProbs();
}

// ── Build slider panel ────────────────────────────────────────────────────────
function buildSliders() {
    const container = document.getElementById('dieroll-sliders');
    if (!container) return;
    const icons = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:4px';

        const icon = document.createElement('span');
        icon.style.cssText = 'width:22px;text-align:center;font-size:1.1em';
        icon.textContent   = icons[i];

        const slider   = document.createElement('input');
        slider.type    = 'range';
        slider.min     = '0';
        slider.max     = '10';
        slider.step    = '0.05';
        slider.value   = '1';
        slider.id      = `dieroll-pslider-${i}`;
        slider.style.cssText = 'flex:1;accent-color:#c0392b;cursor:pointer';
        slider.addEventListener('input', function () {
            rawWeights[i] = parseFloat(this.value);
            rebuildProbs();
        });

        const val = document.createElement('span');
        val.style.cssText = 'width:42px;text-align:right;font-family:monospace;font-size:0.8em;color:#7ec8e3';
        val.id            = `dieroll-pval-${i}`;
        val.textContent   = (1/6).toFixed(3);

        row.appendChild(icon);
        row.appendChild(slider);
        row.appendChild(val);
        container.appendChild(row);
    }
}

// ── Roll handler ──────────────────────────────────────────────────────────────
function doRoll() {
    if (animating) return;
    const face = sampleOutcome();
    rollAnimation(face, () => {
        counts[face - 1]++;
        totalRolls++;
        updateStats();
        drawHistogram();
    });
}

function updateStats() {
    const countEl = document.getElementById('dieroll-count');
    const meanEl  = document.getElementById('dieroll-mean');
    if (countEl) countEl.textContent = totalRolls;
    if (meanEl) {
        if (totalRolls > 0) {
            let sum = 0;
            for (let i = 0; i < 6; i++) sum += (i + 1) * counts[i];
            meanEl.textContent = (sum / totalRolls).toFixed(2);
        } else {
            meanEl.textContent = '—';
        }
    }
}

// ── Wire up UI ────────────────────────────────────────────────────────────────
const rollBtn    = document.getElementById('dieroll-roll');
const resetBtn   = document.getElementById('dieroll-reset');
const dieCanvas  = document.getElementById('dieroll-die');
const uniformBtn = document.getElementById('dieroll-uniform');
const jaynesBtn  = document.getElementById('dieroll-jaynes');
const lowBtn     = document.getElementById('dieroll-low');

if (rollBtn)    rollBtn.addEventListener('click', doRoll);
if (dieCanvas)  dieCanvas.addEventListener('click', doRoll);

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        counts     = [0, 0, 0, 0, 0, 0];
        totalRolls = 0;
        updateStats();
        drawHistogram();
    });
}

if (uniformBtn) uniformBtn.addEventListener('click', () => setWeights([1,1,1,1,1,1]));
if (jaynesBtn)  jaynesBtn.addEventListener('click',  () => setWeights(maxEntropyDist(4.5)));
if (lowBtn)     lowBtn.addEventListener('click',     () => setWeights(maxEntropyDist(2.0)));

// ── Initialise ────────────────────────────────────────────────────────────────
buildSliders();
rebuildProbs();
if (dieCanvas) {
    dieCanvas.style.cursor = 'pointer';
    drawDie(dieCanvas, 1, false);
}
drawHistogram();

})(); // end IIFE
