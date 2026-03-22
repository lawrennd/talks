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

	// 3×3 grid of ball positions
	const cols = [W / 4, W / 2, (3 * W) / 4];
	const rows = [H / 4, H / 2, (3 * H) / 4];
	const cx   = W / 2, cy = H / 2;

	// Small symmetry-breaking perturbation for directional inits
	const tiny = () => (Math.random() - 0.5) * 0.2;

	for (let row = 0; row < 3; row++) {
	    for (let col = 0; col < 3; col++) {
		const k  = row * 3 + col;
		const bx = cols[col];
		const by = rows[row];
		const rx = bx - cx;        // displacement from canvas centre
		const ry = by - cy;
		const r  = Math.hypot(rx, ry);

		const ball = new Ball(this.context, bx, by, radius);
		ball.color = MultiGame.BALL_COLORS[k];

		switch (this.initType) {
		    case 'top':
			ball.dx = tiny(); ball.dy =  spd; break;
		    case 'bottom':
			ball.dx = tiny(); ball.dy = -spd; break;
		    case 'left':
			ball.dx =  spd; ball.dy = tiny(); break;
		    case 'right':
			ball.dx = -spd; ball.dy = tiny(); break;
		    case 'cw':
			// Clockwise tangential velocity in screen coords (y-down):
			//   tangent_CW = (-ry, rx) / |r|
			// Verified: ball at top (ry<0) moves right (+dx) ✓
			//           ball at right (rx>0) moves down (+dy) ✓
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

	// Redraw grid every 5 steps — but skip during skip/fast-forward phase
	// to avoid 200 expensive canvas renders blocking the main thread.
	if (this.simulation.draw && this.simulation.time % 5 === 0) {
	    this.drawGrid();
	}
    }

    draw() {
	super.draw();
	// Refresh the grid once per animation frame (catches post-skip updates)
	this.drawGrid();
    }

    // drawGrid renders the 3×3 panel of per-ball cumulative (vx,vy) heatmaps.
    // Each panel shows where that ball has been in velocity space since the
    // last reset.  The entropy H(vx,vy) for each ball is overlaid top-left;
    // a coloured dot with the ball number sits top-right.
    drawGrid() {
	const gc = document.getElementById('multigame-grid');
	if (!gc) return;
	const ctx = gc.getContext('2d');
	const GW  = gc.width;
	const GH  = gc.height;
	const n   = this.nbins;

	ctx.clearRect(0, 0, GW, GH);
	ctx.fillStyle = '#e8e8e8';
	ctx.fillRect(0, 0, GW, GH);

	// Reserve a 20px strip on the left for the vy axis label and a 20px
	// strip at the bottom for the vx axis label.
	const gridX0 = 20;
	const gridY0 = 4;
	const gridW  = GW - gridX0;
	const gridH  = GH - gridY0 - 20;
	const cellW  = gridW / 3;
	const cellH  = gridH / 3;
	const pad    = 5;

	for (let k = 0; k < this.nballs; k++) {
	    const row = Math.floor(k / 3);
	    const col = k % 3;
	    const px0 = gridX0 + col * cellW + pad;
	    const py0 = gridY0 + row * cellH + pad;
	    const cw  = cellW - 2 * pad;
	    const ch  = cellH - 2 * pad;

	    // Cell background
	    ctx.fillStyle = '#fff';
	    ctx.fillRect(px0, py0, cw, ch);

	    const hist  = this.ballHist[k];
	    const total = this.ballCount[k];
	    if (total === 0) continue;

	    // Normalised peak probability for relative colour scaling
	    let maxP = 1e-9;
	    for (let ix = 0; ix < n; ix++)
		for (let iy = 0; iy < n; iy++) {
		    const p = hist[ix][iy] / total;
		    if (p > maxP) maxP = p;
		}

	    // Heatmap: ix = vx direction (left→right), iy = vy (bottom→top)
	    const bw = cw / n;
	    const bh = ch / n;
	    for (let ix = 0; ix < n; ix++) {
		for (let iy = 0; iy < n; iy++) {
		    const p  = hist[ix][iy] / total;
		    const d  = p / maxP;
		    const hx = px0 + ix * bw;
		    const hy = py0 + ch - (iy + 1) * bh;   // flip: iy=0 → bottom
		    ctx.fillStyle = d < 5e-4
			? '#f0f0f6'
			: `rgba(20,50,170,${Math.min(1, 0.08 + 0.92 * d).toFixed(2)})`;
		    ctx.fillRect(hx, hy, bw + 0.5, bh + 0.5);
		}
	    }

	    // Grey crosshair at vx = 0, vy = 0
	    const zeroFrac = (this.binIndex(0) + 0.5) / n;
	    ctx.strokeStyle = 'rgba(140,140,140,0.5)';
	    ctx.lineWidth = 0.8;
	    ctx.beginPath();
	    ctx.moveTo(px0 + zeroFrac * cw, py0);
	    ctx.lineTo(px0 + zeroFrac * cw, py0 + ch);
	    ctx.moveTo(px0,       py0 + ch - zeroFrac * ch);
	    ctx.lineTo(px0 + cw,  py0 + ch - zeroFrac * ch);
	    ctx.stroke();

	    // Cell border
	    ctx.strokeStyle = '#aaa';
	    ctx.lineWidth = 1;
	    ctx.strokeRect(px0, py0, cw, ch);

	    // Shannon entropy H(vx,vy) accumulated for this ball
	    let H_k = 0;
	    for (let ix = 0; ix < n; ix++)
		for (let iy = 0; iy < n; iy++) {
		    const p = hist[ix][iy] / total;
		    if (p > 0) H_k -= p * Math.log2(p);
		}

	    // Entropy label (top-left, semi-transparent pill)
	    ctx.fillStyle = 'rgba(255,255,255,0.78)';
	    ctx.fillRect(px0 + 2, py0 + 2, 62, 14);
	    ctx.fillStyle = '#222';
	    ctx.font = '10px monospace';
	    ctx.textAlign    = 'left';
	    ctx.textBaseline = 'top';
	    ctx.fillText(`H=${H_k.toFixed(2)}b`, px0 + 4, py0 + 3);

	    // Coloured ball-number dot (top-right)
	    const dotX = px0 + cw - 10;
	    const dotY = py0 + 9;
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

	// Global axis labels outside the grid
	ctx.fillStyle = '#555';
	ctx.font      = '11px sans-serif';
	// vx label at the bottom
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillText('vₓ →', gridX0 + gridW / 2, GH - 2);
	// vy label on the left, rotated
	ctx.save();
	ctx.translate(10, gridY0 + gridH / 2);
	ctx.rotate(-Math.PI / 2);
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('vᵧ ↑', 0, 0);
	ctx.restore();
    }
}


// ── UI wiring ─────────────────────────────────────────────────────────────────

const mgResetBtn = document.getElementById('multigame-reset');
const mgPauseBtn = document.getElementById('multigame-pause');
const mgSkipBtn  = document.getElementById('multigame-skip');
const mgInitSel  = document.getElementById('multigame-init');

if (mgResetBtn) mgResetBtn.addEventListener('click', () => multigame.reset());
if (mgPauseBtn) mgPauseBtn.addEventListener('click', () => multigame.togglePause());
if (mgSkipBtn)  mgSkipBtn.addEventListener('click',  () => multigame.toggleDraw());
if (mgInitSel) {
    mgInitSel.addEventListener('change', function () {
	multigame.initType = this.value;
	multigame.reset();
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
