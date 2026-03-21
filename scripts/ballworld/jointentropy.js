// Copyright (c) 2024 Neil D. Lawrence

class JointEntropy extends Game {
    constructor(objects, params, simulation, boundaries, context, colors) {
	super(objects, params, simulation, boundaries, context, colors);
	this.nbins = 20;
	this.vmin = -20;
	this.vmax = 20;
	this.vstep = (this.vmax - this.vmin) / this.nbins;
	// Exponential moving average state
	// Slow alpha for entropy values (stable reading); fast alpha for r (responsive to coupling changes)
	this.emaAlpha  = 0.02;
	this.emaAlphaR = 0.1;
	this.emaHx   = null;
	this.emaHy   = null;
	this.emaHxy  = null;
	this.emaMI   = null;
	this.emaKE   = null;
	this.emaR    = null;  // Kuramoto order parameter
	// EMA-smoothed joint probability array for the stats visualisation.
	// Marginals px/py are computed from dispPxy inside drawStats, ensuring
	// the histograms are exactly the marginals of the displayed heatmap.
	this.dispAlpha = 0.05;
	this.dispPxy   = null;
    }

    binIndex(v) {
	const idx = Math.floor((v - this.vmin) / this.vstep);
	return Math.max(0, Math.min(this.nbins - 1, idx));
    }

    birth() {
	var radius = 10;
	// Collect x positions first so we can distribute balls evenly
	var positions = [];
	for (var x = 3*radius; x < this.context.canvas.width; x += 2*radius + 1) {
	    positions.push(x);
	}
	var N = positions.length;
	for (var k = 0; k < N; k++) {
	    var temp = new Ball(this.context, positions[k], radius, radius);
	    // All balls start moving in the same direction (down), matching
	    // the entropy-billiards initialisation.  A tiny random dx breaks
	    // symmetry so balls gradually collide and thermalise.
	    temp.dx = Math.random() * 1e-1;
	    temp.dy = this.params.initialSpeed;
	    temp.color = this.colors.ball;
	    this.objects.balls.push(temp);
	}
	// Reset EMA so it tracks from this fresh state
	this.emaHx  = null;
	this.emaHy  = null;
	this.emaHxy = null;
	this.emaMI  = null;
	this.emaKE  = null;
	this.emaR   = null;
	this.dispPxy = null;
    }

    reset() {
	this.objects.balls = [];
	this.birth();
    }

    demon() {
	const n = this.nbins;
	const N = this.objects.balls.length;
	if (N === 0) return;

	// ── Kuramoto mean-field coupling ─────────────────────────────────────────
	// Each ball's velocity direction is nudged toward the mean direction:
	//   Δθ_i = κ · sin(θ_mean − θ_i)
	// This is the canonical intensive pairwise interaction: the mean direction
	// already averages over all N balls, so the correction to each ball is O(1)
	// regardless of N.  Individual speeds are preserved (KE per ball unchanged).
	// With κ > 0 a nonzero mutual information I(vx;vy) is maintained at
	// steady state; above a critical κ_c the system synchronises (r → 1).
	const kappa = this.params.pairwiseCoupling || 0;
	if (kappa > 0 && N > 1) {
	    let meanDx = 0, meanDy = 0;
	    for (const ball of this.objects.balls) {
		meanDx += ball.dx;
		meanDy += ball.dy;
	    }
	    meanDx /= N;
	    meanDy /= N;
	    const meanMag = Math.hypot(meanDx, meanDy);
	    if (meanMag > 1e-8) {
		const meanAngle = Math.atan2(meanDy, meanDx);
		for (const ball of this.objects.balls) {
		    const speed = Math.hypot(ball.dx, ball.dy);
		    if (speed > 0) {
			const angle    = Math.atan2(ball.dy, ball.dx);
			const newAngle = angle + kappa * Math.sin(meanAngle - angle);
			ball.dx = speed * Math.cos(newAngle);
			ball.dy = speed * Math.sin(newAngle);
		    }
		}
	    }
	}

	// Build instantaneous 1-D marginal histograms for vx and vy and the
	// 2-D joint histogram.  We reset each call so the displayed values
	// reflect the current state of the gas rather than a running average.
	const hx  = new Array(n).fill(0);
	const hy  = new Array(n).fill(0);
	const hxy = Array.from({length: n}, () => new Array(n).fill(0));

	for (const ball of this.objects.balls) {
	    const ix = this.binIndex(ball.dx);
	    const iy = this.binIndex(ball.dy);
	    hx[ix]++;
	    hy[iy]++;
	    hxy[ix][iy]++;
	}

	// Shannon entropy using log base 2 (bits)
	let Hx = 0;
	for (const p of hx) {
	    if (p > 0) Hx -= (p/N) * Math.log2(p/N);
	}

	let Hy = 0;
	for (const p of hy) {
	    if (p > 0) Hy -= (p/N) * Math.log2(p/N);
	}

	let Hxy = 0;
	for (const row of hxy) {
	    for (const p of row) {
		if (p > 0) Hxy -= (p/N) * Math.log2(p/N);
	    }
	}

	// Mutual information I(vx;vy) = H(vx) + H(vy) - H(vx,vy)
	// Equals zero when vx and vy are statistically independent.
	const MI = Hx + Hy - Hxy;

	// Mean kinetic energy per ball (conserved in elastic collisions)
	let KE = 0;
	for (const ball of this.objects.balls) {
	    KE += ball.dx * ball.dx + ball.dy * ball.dy;
	}
	KE /= N;

	// Kuramoto order parameter r = |⟨e^{iθ}⟩|, ranges 0 (disordered) → 1 (synchronised)
	// r is computed from unit velocity vectors so it is independent of speed.
	let rRe = 0, rIm = 0;
	for (const ball of this.objects.balls) {
	    const speed = Math.hypot(ball.dx, ball.dy);
	    if (speed > 0) { rRe += ball.dx / speed; rIm += ball.dy / speed; }
	}
	const R = Math.hypot(rRe, rIm) / N;

	// Exponential moving average to smooth the displayed values
	const a  = this.emaAlpha;
	const ar = this.emaAlphaR;
	this.emaHx  = (this.emaHx  === null) ? Hx  : (1 - a)  * this.emaHx  + a  * Hx;
	this.emaHy  = (this.emaHy  === null) ? Hy  : (1 - a)  * this.emaHy  + a  * Hy;
	this.emaHxy = (this.emaHxy === null) ? Hxy : (1 - a)  * this.emaHxy + a  * Hxy;
	this.emaMI  = (this.emaMI  === null) ? MI  : (1 - a)  * this.emaMI  + a  * MI;
	this.emaKE  = (this.emaKE  === null) ? KE  : (1 - a)  * this.emaKE  + a  * KE;
	this.emaR   = (this.emaR   === null) ? R   : (1 - ar) * this.emaR   + ar * R;

	document.getElementById("jointentropy-hx").value    = this.emaHx.toFixed(3);
	document.getElementById("jointentropy-hy").value    = this.emaHy.toFixed(3);
	document.getElementById("jointentropy-hxphy").value = (this.emaHx + this.emaHy).toFixed(3);
	document.getElementById("jointentropy-hxy").value   = this.emaHxy.toFixed(3);
	document.getElementById("jointentropy-mi").value    = this.emaMI.toFixed(3);
	const keEl = document.getElementById("jointentropy-ke");
	if (keEl) keEl.value = this.emaKE.toFixed(3);
	const rEl = document.getElementById("jointentropy-r");
	if (rEl) rEl.value = this.emaR.toFixed(3);

	// Update EMA-smoothed joint probability array for the statistics visualisation.
	// Marginals are computed from dispPxy inside drawStats.
	const ad = this.dispAlpha;
	if (this.dispPxy === null) {
	    this.dispPxy = hxy.map(row => row.map(v => v / N));
	} else {
	    for (let i = 0; i < n; i++)
		for (let j = 0; j < n; j++)
		    this.dispPxy[i][j] = (1 - ad) * this.dispPxy[i][j] + ad * hxy[i][j] / N;
	}
	this.drawStats(this.dispPxy);

	if (this.simulation.time % 1000 == 0) {
	    this.simulation.draw = true;
	}
    }

    // drawStats renders the joint velocity density p(vx,vy) as a heatmap with
    // marginal histograms p(vx) below and p(vy) to the right.
    // pxy is the EMA-smoothed joint probability array (values already divided by N).
    // Marginals px and py are computed here as column/row sums of pxy so that
    // the histograms are exactly consistent with the displayed heatmap.
    drawStats(pxy) {
	const statsCanvas = document.getElementById('jointentropy-stats');
	if (!statsCanvas) return;
	const ctx = statsCanvas.getContext('2d');
	const W = statsCanvas.width;   // 440
	const H = statsCanvas.height;  // 440
	const n = this.nbins;          // 20

	// ── Layout ──────────────────────────────────────────────────────────────
	// Joint panel (square) + p(vx) strip below + p(vy) strip to the right.
	const padL = 36, padB = 36, padR = 7, padT = 7;
	const histH = 48, histW = 48, gap = 4;
	const jx = padL, jy = padT;
	const jw = W - padL - gap - histW - padR;   // ≈345
	const jh = H - padT - gap - histH - padB;   // ≈345
	const cw = jw / n;
	const ch = jh / n;

	ctx.clearRect(0, 0, W, H);
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, W, H);

	// ── Marginals: sum rows/columns of the joint distribution ───────────────
	const px = new Array(n).fill(0);
	const py = new Array(n).fill(0);
	for (let ix = 0; ix < n; ix++)
	    for (let iy = 0; iy < n; iy++) {
		px[ix] += pxy[ix][iy];
		py[iy] += pxy[ix][iy];
	    }

	// ── Joint density heatmap ────────────────────────────────────────────────
	let maxP = 1e-9;
	for (let ix = 0; ix < n; ix++)
	    for (let iy = 0; iy < n; iy++)
		if (pxy[ix][iy] > maxP) maxP = pxy[ix][iy];

	for (let ix = 0; ix < n; ix++) {
	    for (let iy = 0; iy < n; iy++) {
		// iy=0 is the lowest vy bin; canvas y increases downward, so flip.
		const cx = jx + ix * cw;
		const cy = jy + jh - (iy + 1) * ch;
		const d  = pxy[ix][iy] / maxP;
		ctx.fillStyle = d < 5e-4
		    ? '#f0f0f6'
		    : `rgba(20,50,170,${Math.min(1, 0.1 + 0.9 * d).toFixed(2)})`;
		ctx.fillRect(cx, cy, cw + 0.5, ch + 0.5);
	    }
	}

	// Joint panel border
	ctx.strokeStyle = '#999';
	ctx.lineWidth = 1;
	ctx.strokeRect(jx, jy, jw, jh);

	// Zero cross-hairs: vmin=-20, vmax=20, nbins=20 → vx=0 at bin boundary 10
	const x0 = jx + (n / 2) * cw;
	const y0 = jy + jh - (n / 2) * ch;
	ctx.save();
	ctx.strokeStyle = 'rgba(0,0,0,0.2)';
	ctx.setLineDash([3, 4]);
	ctx.lineWidth = 1;
	ctx.beginPath(); ctx.moveTo(x0, jy);  ctx.lineTo(x0, jy + jh); ctx.stroke();
	ctx.beginPath(); ctx.moveTo(jx, y0);  ctx.lineTo(jx + jw, y0); ctx.stroke();
	ctx.restore();

	// ── p(vx) histogram (below joint panel) ───────────────────────────────
	const maxPx  = Math.max(...px, 1e-9);
	const hxTop  = jy + jh + gap;
	const hxBase = hxTop + histH;
	ctx.fillStyle = 'rgba(20,50,170,0.5)';
	for (let ix = 0; ix < n; ix++) {
	    const bh = (px[ix] / maxPx) * histH;
	    ctx.fillRect(jx + ix * cw, hxBase - bh, cw - 1, bh);
	}
	ctx.strokeStyle = '#ccc';
	ctx.lineWidth = 0.5;
	ctx.strokeRect(jx, hxTop, jw, histH);

	// ── p(vy) histogram (right of joint panel) ────────────────────────────
	const maxPy  = Math.max(...py, 1e-9);
	const hyLeft = jx + jw + gap;
	ctx.fillStyle = 'rgba(20,50,170,0.5)';
	for (let iy = 0; iy < n; iy++) {
	    const bw = (py[iy] / maxPy) * histW;
	    ctx.fillRect(hyLeft, jy + jh - (iy + 1) * ch, bw, ch - 1);
	}
	ctx.strokeStyle = '#ccc';
	ctx.lineWidth = 0.5;
	ctx.strokeRect(hyLeft, jy, histW, jh);

	// ── Tick labels ────────────────────────────────────────────────────────
	ctx.fillStyle = '#555';
	ctx.font = `${Math.max(9, Math.round(W * 0.026))}px monospace`;
	ctx.textAlign = 'center';
	for (const [v, tx] of [[this.vmin, jx], [0, x0], [this.vmax, jx + jw]])
	    ctx.fillText(v, tx, hxBase + 14);
	ctx.textAlign = 'right';
	for (const [v, ty] of [[this.vmax, jy], [0, y0], [this.vmin, jy + jh]])
	    ctx.fillText(v, jx - 4, ty + 4);

	// ── Axis labels ────────────────────────────────────────────────────────
	ctx.fillStyle = '#222';
	ctx.font = `italic ${Math.max(11, Math.round(W * 0.03))}px serif`;
	ctx.textAlign = 'center';
	ctx.fillText('vₓ', jx + jw / 2, H - 5);
	ctx.save();
	ctx.translate(12, jy + jh / 2);
	ctx.rotate(-Math.PI / 2);
	ctx.fillText('vᵧ', 0, 0);
	ctx.restore();
    }
}


// ── UI wiring ────────────────────────────────────────────────────────────────

let jeNewBallButton = document.getElementById("jointentropy-newball");
let jePauseButton   = document.getElementById("jointentropy-pause");
let jeSkipButton    = document.getElementById("jointentropy-skip");

jeNewBallButton.addEventListener("click", function() { jointentropy.reset(); });
jePauseButton.addEventListener("click",   function() { jointentropy.togglePause(); });
jeSkipButton.addEventListener("click",    function() { jointentropy.toggleDraw(); });

const jeKappaSlider = document.getElementById("jointentropy-kappa");
if (jeKappaSlider) {
    jeKappaSlider.addEventListener("input", function() {
	jeParams.pairwiseCoupling = parseFloat(this.value);
	const kv = document.getElementById("jointentropy-kappa-val");
	if (kv) kv.textContent = parseFloat(this.value).toFixed(2);
    });
}


// ── Game setup ───────────────────────────────────────────────────────────────
// Prefixed with "je" to avoid colliding with other game scripts on the same page.

var jeColors = {
    ground: 'rgba(56, 256, 56, 0.8)',
    pin:    'rgba(256, 56, 56, 0.8)',
    ball:   'rgba(200, 200, 200, 0.8)'
};

var jeSimulation = {
    paused:        true,
    gravity:       false,
    drag:          false,
    sound:         false,
    clearCanv:     true,
    dt:            1
};

var jeBoundaries = {
    wallBounce:       true,
    floorBounce:      true,
    floorWrap:        false,
    floorWrapCenter:  true,
    floorReset:       false
};

var jeParams = {
    inelasticityFactor: 1.0,
    initialSpeed:       5,
    energy:             0.0,
    gravityAccel:       0.06,
    arrowAccel:         0.4,
    stochasticity:      0.0,
    stochasticityScale: 0.2,
    dragFactor:         0.0,
    pairwiseCoupling:   0.0   // Kuramoto coupling strength κ (0 = isolated gas)
};

var jeObjects = {
    balls:     [],
    boxes:     [],
    pits:      [],
    posts:     [],
    membranes: []
};

var jeContext = {
    canvas: document.getElementById("jointentropy-canvas")
};

var jointentropy = new JointEntropy(
    jeObjects, jeParams, jeSimulation, jeBoundaries, jeContext, jeColors
);
jointentropy.reset();
draw(jointentropy);
