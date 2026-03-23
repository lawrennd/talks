// Copyright (c) 2025 Neil D. Lawrence
//
// MultiGame: nine-ball billiard that tracks each ball's cumulative
// (vx, vy) velocity distribution and displays them as a 3×3 grid of
// heatmaps, one per ball.  Six initialization modes let the user explore
// how the route to thermalisation depends on the starting conditions.

class MultiGame extends Game {
    constructor(objects, params, simulation, boundaries, context, colors) {
	super(objects, params, simulation, boundaries, context, colors);
	this.nballs   = 9;
	this.nbins    = 16;
	this.vmin     = -18;
	this.vmax     =  18;
	this.vstep    = (this.vmax - this.vmin) / this.nbins;
	this.initType = 'top';    // changed by the UI dropdown
	this.drawMode = '1d';     // '2d' = joint heatmap, '1d' = combined marginal

	// Per-ball cumulative velocity histograms: ballHist[k][ix][iy]
	// ballCount[k] = total samples accumulated for ball k
	this.ballHist  = null;
	this.ballCount = null;
    }

    binIndex(v) {
	const idx = Math.floor((v - this.vmin) / this.vstep);
	return Math.max(0, Math.min(this.nbins - 1, idx));
    }

    // Nine distinct colours for the balls (matches the 3×3 grid layout)
    static get BALL_COLORS() {
	return [
	    '#e74c3c', '#e67e22', '#f1c40f',   // row 0: red, orange, yellow
	    '#27ae60', '#3498db', '#9b59b6',   // row 1: green, blue, purple
	    '#1abc9c', '#e91e63', '#795548'    // row 2: teal, pink, brown
	];
    }

    birth() {
	const radius = 14;
	const W   = this.context.canvas.width;
	const H   = this.context.canvas.height;
	const spd = this.params.initialSpeed;
	const margin = radius + 4;

	// Build 9 (x, y) start positions based on initType:
	//   directional → line at the edge the balls are coming from
	//   propellor   → horizontal line across the middle
	const positions = [];
	const isHoriz = ['top', 'bottom', 'cw', 'ccw'].includes(this.initType);
	if (isHoriz) {
	    // 'top' → line near top; 'cw'/'ccw' → middle; 'bottom' → near bottom
	    const fixedY = this.initType === 'top'    ? margin
			 : this.initType === 'bottom' ? H - margin
			 :                              H / 2;
	    for (let k = 0; k < 9; k++) {
		const x = margin + k * (W - 2 * margin) / 8;
		positions.push([x, fixedY]);
	    }
	} else {
	    // Vertical line — 'left' → left edge, 'right' → right edge
	    const fixedX = this.initType === 'left' ? margin : W - margin;
	    for (let k = 0; k < 9; k++) {
		const y = margin + k * (H - 2 * margin) / 8;
		positions.push([fixedX, y]);
	    }
	}

	// Small symmetry-breaking perturbation for directional inits
	const tiny = () => (Math.random() - 0.5) * 0.2;

	for (let k = 0; k < 9; k++) {
	    const [bx, by] = positions[k];
	    const rx = bx - W / 2;   // displacement from canvas centre (propellor)
	    const ry = by - H / 2;
	    const r  = Math.hypot(rx, ry);

		const ball = new Ball(this.context, bx, by, radius);
		ball.color = MultiGame.BALL_COLORS[k];

		switch (this.initType) {
		    case 'top':
			ball.dx = tiny(); ball.dy =  spd + tiny(); break;
		    case 'bottom':
			ball.dx = tiny(); ball.dy = -spd + tiny(); break;
		    case 'left':
			ball.dx =  spd + tiny(); ball.dy = tiny(); break;
		    case 'right':
			ball.dx = -spd + tiny(); ball.dy = tiny(); break;
		    case 'cw':
			// Clockwise tangential velocity in screen coords (y-down):
			//   tangent_CW = (-ry, rx) / |r|
			if (r < 1) { ball.dx = tiny(); ball.dy = tiny(); }
			else { ball.dx = -ry / r * spd; ball.dy = rx / r * spd; }
			break;
		    case 'ccw':
			// Counter-clockwise tangential velocity:
			//   tangent_CCW = (ry, -rx) / |r|
			if (r < 1) { ball.dx = tiny(); ball.dy = tiny(); }
			else { ball.dx = ry / r * spd; ball.dy = -rx / r * spd; }
			break;
		}

		// Override draw so the ball carries its index number (1–9)
		const kLabel = k + 1;
		const ctxRef = this.context;
		ball.draw = function () {
		    ctxRef.ctx.beginPath();
		    ctxRef.ctx.arc(
			Math.round(this.x), Math.round(this.y),
			this.radius, 0, 2 * Math.PI
		    );
		    ctxRef.ctx.fillStyle = this.color;
		    ctxRef.ctx.fill();
		    ctxRef.ctx.strokeStyle = 'rgba(0,0,0,0.6)';
		    ctxRef.ctx.stroke();
		    ctxRef.ctx.closePath();
		    // White index label
		    ctxRef.ctx.fillStyle = '#fff';
		    ctxRef.ctx.font = `bold ${Math.floor(this.radius * 0.85)}px sans-serif`;
		    ctxRef.ctx.textAlign    = 'center';
		    ctxRef.ctx.textBaseline = 'middle';
		    ctxRef.ctx.fillText(String(kLabel), Math.round(this.x), Math.round(this.y));
		};

		this.objects.balls.push(ball);
	}

	// (Re)initialise per-ball cumulative histograms
	const n = this.nbins;
	this.ballHist = Array.from({ length: this.nballs }, () =>
	    Array.from({ length: n }, () => new Array(n).fill(0))
	);
	this.ballCount = new Array(this.nballs).fill(0);
    }

    reset() {
	this.objects.balls = [];
	this.birth();
    }

    demon() {
	const N = this.objects.balls.length;
	if (N === 0) return;

	// Accumulate per-ball velocity histograms (cumulative counts, not EMA,
	// so the displayed distribution reflects the full history since reset —
	// starting as a single dot and spreading as the gas thermalises)
	for (let k = 0; k < N; k++) {
	    const ball = this.objects.balls[k];
	    this.ballHist[k][this.binIndex(ball.dx)][this.binIndex(ball.dy)]++;
	    this.ballCount[k]++;
	}

	// End the fast-forward phase every 1000 steps (mirrors HistogramGame)
	if (this.simulation.time % 1000 === 0) {
	    this.simulation.draw = true;
	}
    }

    draw() {
	super.draw();
	// Grid is rendered here — once per animation frame — never inside demon().
	// This keeps demon() as pure data accumulation with zero canvas work,
	// and means the skip phase (which never calls draw()) doesn't freeze.
	this.drawGrid();
    }

    // Shared layout helpers used by both draw modes
    _gridLayout(gc) {
	const GW = gc.width, GH = gc.height;
	const gridX0 = 20, gridY0 = 4;
	const gridW  = GW - gridX0;
	const gridH  = GH - gridY0 - 20;
	return { GW, GH, gridX0, gridY0, gridW, gridH,
		 cellW: gridW / 3, cellH: gridH / 3 };
    }

    // Shared: draw ball-number dot (top-right of a cell)
    _drawBallDot(ctx, k, px0, py0, cw) {
	const dotX = px0 + cw - 10, dotY = py0 + 9;
	ctx.beginPath();
	ctx.arc(dotX, dotY, 7, 0, 2 * Math.PI);
	ctx.fillStyle = MultiGame.BALL_COLORS[k];
	ctx.fill();
	ctx.strokeStyle = 'rgba(0,0,0,0.35)';
	ctx.lineWidth   = 0.8;
	ctx.stroke();
	ctx.fillStyle    = '#fff';
	ctx.font         = 'bold 8px sans-serif';
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(String(k + 1), dotX, dotY);
    }

    // drawGrid dispatches to the active display mode.
    drawGrid() {
	const gc = document.getElementById('multigame-grid');
	if (!gc) return;
	if (this.drawMode === '1d') this._drawGrid1D(gc);
	else                        this._drawGrid2D(gc);
    }

    // ── 2D joint heatmap ────────────────────────────────────────────────────────
    // Shows p(vx, vy) for each ball as a colour-intensity heatmap.
    // Reveals the 2D structure of thermalisation (e.g. hot spots, correlation).
    _drawGrid2D(gc) {
	const ctx = gc.getContext('2d');
	const { GW, GH, gridX0, gridY0, gridW, gridH, cellW, cellH }
	    = this._gridLayout(gc);
	const n   = this.nbins;
	const pad = 5;

	ctx.clearRect(0, 0, GW, GH);
	ctx.fillStyle = '#e8e8e8';
	ctx.fillRect(0, 0, GW, GH);

	for (let k = 0; k < this.nballs; k++) {
	    const row = Math.floor(k / 3), col = k % 3;
	    const px0 = gridX0 + col * cellW + pad;
	    const py0 = gridY0 + row * cellH + pad;
	    const cw  = cellW - 2 * pad, ch = cellH - 2 * pad;

	    ctx.fillStyle = '#fff';
	    ctx.fillRect(px0, py0, cw, ch);

	    const hist  = this.ballHist[k];
	    const total = this.ballCount[k];
	    if (total === 0) continue;

	    let maxP = 1e-9;
	    for (let ix = 0; ix < n; ix++)
		for (let iy = 0; iy < n; iy++) {
		    const p = hist[ix][iy] / total;
		    if (p > maxP) maxP = p;
		}

	    const bw = cw / n, bh = ch / n;
	    for (let ix = 0; ix < n; ix++) {
		for (let iy = 0; iy < n; iy++) {
		    const d  = hist[ix][iy] / total / maxP;
		    const hx = px0 + ix * bw;
		    const hy = py0 + ch - (iy + 1) * bh;
		    ctx.fillStyle = d < 5e-4
			? '#f0f0f6'
			: `rgba(20,50,170,${Math.min(1, 0.08 + 0.92 * d).toFixed(2)})`;
		    ctx.fillRect(hx, hy, bw + 0.5, bh + 0.5);
		}
	    }

	    // Crosshair at v = 0
	    const zf = (this.binIndex(0) + 0.5) / n;
	    ctx.strokeStyle = 'rgba(140,140,140,0.5)';
	    ctx.lineWidth   = 0.8;
	    ctx.beginPath();
	    ctx.moveTo(px0 + zf * cw, py0); ctx.lineTo(px0 + zf * cw, py0 + ch);
	    ctx.moveTo(px0, py0 + ch - zf * ch); ctx.lineTo(px0 + cw, py0 + ch - zf * ch);
	    ctx.stroke();

	    ctx.strokeStyle = '#aaa'; ctx.lineWidth = 1;
	    ctx.strokeRect(px0, py0, cw, ch);

	    let H_k = 0;
	    for (let ix = 0; ix < n; ix++)
		for (let iy = 0; iy < n; iy++) {
		    const p = hist[ix][iy] / total;
		    if (p > 0) H_k -= p * Math.log2(p);
		}

	    ctx.fillStyle = 'rgba(255,255,255,0.78)';
	    ctx.fillRect(px0 + 2, py0 + 2, 62, 14);
	    ctx.fillStyle = '#222'; ctx.font = '10px monospace';
	    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
	    ctx.fillText(`H=${H_k.toFixed(2)}b`, px0 + 4, py0 + 3);

	    this._drawBallDot(ctx, k, px0, py0, cw);
	}

	ctx.fillStyle = '#555'; ctx.font = '11px sans-serif';
	ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
	ctx.fillText('vₓ →', gridX0 + gridW / 2, GH - 2);
	ctx.save();
	ctx.translate(10, gridY0 + gridH / 2);
	ctx.rotate(-Math.PI / 2);
	ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
	ctx.fillText('vᵧ ↑', 0, 0);
	ctx.restore();
    }

    // ── 1D combined marginal histogram ──────────────────────────────────────────
    // For each ball, accumulates p(vx) and p(vy) as separate marginals from the
    // 2D histogram, then overlays them on the same bar chart.  Both marginals
    // should converge to the same symmetric distribution under thermalisation.
    _drawGrid1D(gc) {
	const ctx = gc.getContext('2d');
	const { GW, GH, gridX0, gridY0, gridW, gridH, cellW, cellH }
	    = this._gridLayout(gc);
	const n   = this.nbins;
	const pad = 5;

	ctx.clearRect(0, 0, GW, GH);
	ctx.fillStyle = '#e8e8e8';
	ctx.fillRect(0, 0, GW, GH);

	for (let k = 0; k < this.nballs; k++) {
	    const row = Math.floor(k / 3), col = k % 3;
	    const px0 = gridX0 + col * cellW + pad;
	    const py0 = gridY0 + row * cellH + pad;
	    const cw  = cellW - 2 * pad, ch = cellH - 2 * pad;

	    ctx.fillStyle = '#fff';
	    ctx.fillRect(px0, py0, cw, ch);

	    const hist  = this.ballHist[k];
	    const total = this.ballCount[k];
	    if (total === 0) continue;

	    // Compute marginals: px[i] = sum_j hist[i][j] / total  (vx marginal)
	    //                    py[i] = sum_j hist[j][i] / total  (vy marginal)
	    const px = new Float64Array(n);
	    const py = new Float64Array(n);
	    for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
		    px[i] += hist[i][j];
		    py[i] += hist[j][i];
		}
		px[i] /= total;
		py[i] /= total;
	    }

	    // Scale bars to fill cell height
	    const maxP = Math.max(...px, ...py, 1e-9);
	    const bw   = cw / n;
	    const baseY = py0 + ch;   // bars grow upward from the bottom

	    // Draw vx bars (ball colour, semi-transparent)
	    const col6 = MultiGame.BALL_COLORS[k];
	    ctx.fillStyle = col6 + 'aa';   // ~67% opacity hex suffix
	    for (let i = 0; i < n; i++) {
		const barH = (px[i] / maxP) * ch;
		ctx.fillRect(px0 + i * bw, baseY - barH, bw - 0.5, barH);
	    }

	    // Draw vy bars (darker shade, slightly offset right for overlap legibility)
	    ctx.fillStyle = 'rgba(30,30,30,0.35)';
	    for (let i = 0; i < n; i++) {
		const barH = (py[i] / maxP) * ch;
		ctx.fillRect(px0 + i * bw + 0.5, baseY - barH, bw - 0.5, barH);
	    }

	    // Zero-velocity vertical line
	    const zeroX = px0 + (this.binIndex(0) + 0.5) * bw;
	    ctx.strokeStyle = 'rgba(140,140,140,0.6)';
	    ctx.lineWidth   = 0.8;
	    ctx.beginPath();
	    ctx.moveTo(zeroX, py0); ctx.lineTo(zeroX, baseY);
	    ctx.stroke();

	    ctx.strokeStyle = '#aaa'; ctx.lineWidth = 1;
	    ctx.strokeRect(px0, py0, cw, ch);

	    // Marginal entropies H(vx) and H(vy)
	    let Hx = 0, Hy = 0;
	    for (let i = 0; i < n; i++) {
		if (px[i] > 0) Hx -= px[i] * Math.log2(px[i]);
		if (py[i] > 0) Hy -= py[i] * Math.log2(py[i]);
	    }

	    ctx.fillStyle = 'rgba(255,255,255,0.82)';
	    ctx.fillRect(px0 + 2, py0 + 2, 76, 24);
	    ctx.fillStyle = '#222'; ctx.font = '9px monospace';
	    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
	    ctx.fillText(`Hx=${Hx.toFixed(2)}b`, px0 + 4, py0 + 3);
	    ctx.fillText(`Hy=${Hy.toFixed(2)}b`, px0 + 4, py0 + 13);

	    this._drawBallDot(ctx, k, px0, py0, cw);
	}

	// Legend: coloured square = vx, dark square = vy
	ctx.font = '10px sans-serif'; ctx.textBaseline = 'bottom';
	ctx.fillStyle = '#555';
	ctx.textAlign = 'center';
	ctx.fillText('v →', gridX0 + gridW / 2, GH - 2);
	ctx.textAlign = 'right';
	ctx.fillStyle = 'rgba(80,80,200,0.8)';
	ctx.fillRect(gridX0 + gridW - 44, GH - 15, 10, 10);
	ctx.fillStyle = '#555';
	ctx.fillText(' vₓ', gridX0 + gridW - 32, GH - 3);
	ctx.fillStyle = 'rgba(30,30,30,0.5)';
	ctx.fillRect(gridX0 + gridW - 18, GH - 15, 10, 10);
	ctx.fillStyle = '#555';
	ctx.fillText(' vᵧ', gridX0 + gridW - 6, GH - 3);
    }
}


// ── UI wiring ─────────────────────────────────────────────────────────────────

const mgResetBtn   = document.getElementById('multigame-reset');
const mgPauseBtn   = document.getElementById('multigame-pause');
const mgSkipBtn    = document.getElementById('multigame-skip');
const mgInitSel    = document.getElementById('multigame-init');
const mgDisplaySel = document.getElementById('multigame-display');

if (mgResetBtn) mgResetBtn.addEventListener('click', () => multigame.reset());
if (mgPauseBtn) mgPauseBtn.addEventListener('click', () => multigame.togglePause());
if (mgSkipBtn)  mgSkipBtn.addEventListener('click',  () => multigame.toggleDraw());
if (mgInitSel) {
    mgInitSel.addEventListener('change', function () {
	multigame.initType = this.value;
	multigame.reset();
    });
}
if (mgDisplaySel) {
    mgDisplaySel.addEventListener('change', function () {
	multigame.drawMode = this.value;
	multigame.drawGrid();   // force immediate redraw (works even when paused)
    });
}


// ── Game setup ────────────────────────────────────────────────────────────────
// Variable names prefixed "mg" to avoid collisions with other game scripts
// that may be on the same page.

var mgColors = {
    ground: 'rgba(56, 256, 56, 0.8)',
    pin:    'rgba(256, 56, 56, 0.8)',
    ball:   'rgba(200, 200, 200, 0.8)'
};

var mgSimulation = {
    paused:    true,
    gravity:   false,
    drag:      false,
    sound:     false,
    clearCanv: true,
    dt:        1
};

var mgBoundaries = {
    wallBounce:      true,
    floorBounce:     true,
    floorWrap:       false,
    floorWrapCenter: false,
    floorReset:      false
};

var mgParams = {
    inelasticityFactor: 1.0,
    initialSpeed:       5,
    energy:             0.0,
    gravityAccel:       0.06,
    arrowAccel:         0.4,
    stochasticity:      0.0,
    stochasticityScale: 0.2,
    dragFactor:         0.0
};

var mgObjects = {
    balls:     [],
    boxes:     [],
    pits:      [],
    posts:     [],
    membranes: []
};

var mgContext = {
    canvas: document.getElementById('multigame-canvas')
};

var multigame = new MultiGame(
    mgObjects, mgParams, mgSimulation, mgBoundaries, mgContext, mgColors
);
multigame.reset();
draw(multigame);
