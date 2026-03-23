// Copyright (c) 2025 Neil D. Lawrence
//
// ObserverOutsideGame: same nine-ball billiard as MultiGame, but the
// histogram grid panel on the right is replaced by a large eye that watches
// the simulation from outside.  The pupil tracks the centroid of all balls.

// ── shared eye-drawing helper ─────────────────────────────────────────────────
// Draws a stylised observer eye, centred at (cx, cy), with outer dimensions
// ew × eh.  The pupil is placed at (pupilX, pupilY) — caller is responsible
// for constraining this to a sensible range inside the iris.
function drawObserverEye(ctx, cx, cy, ew, eh, pupilX, pupilY) {
    const hw = ew / 2, hh = eh / 2;
    ctx.save();

    // Sclera (white of eye)
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#fdfaf4';
    ctx.fill();
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Clip iris & pupil to the eye boundary
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, 2 * Math.PI);
    ctx.clip();

    // Iris with a radial gradient for depth
    const irisR = hh * 0.56;
    const g = ctx.createRadialGradient(
	pupilX - irisR * 0.15, pupilY - irisR * 0.15, irisR * 0.04,
	pupilX, pupilY, irisR
    );
    g.addColorStop(0,   '#62bae8');
    g.addColorStop(0.5, '#2a78a8');
    g.addColorStop(1,   '#103c5a');
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, irisR, 0, 2 * Math.PI);
    ctx.fillStyle = g;
    ctx.fill();

    // Pupil
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, irisR * 0.48, 0, 2 * Math.PI);
    ctx.fillStyle = '#0d0d0d';
    ctx.fill();

    // Specular highlight
    ctx.beginPath();
    ctx.arc(
	pupilX - irisR * 0.22, pupilY - irisR * 0.22,
	irisR * 0.15, 0, 2 * Math.PI
    );
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fill();

    ctx.restore();
}

// ── game class ────────────────────────────────────────────────────────────────
class ObserverOutsideGame extends MultiGame {

    // Override drawGrid() to paint the eye canvas instead of histograms.
    drawGrid() {
	const gc = document.getElementById('observer-outside-eye');
	if (!gc) return;
	const ctx = gc.getContext('2d');
	const W = gc.width, H = gc.height;

	ctx.clearRect(0, 0, W, H);
	ctx.fillStyle = '#f5f0e8';
	ctx.fillRect(0, 0, W, H);

	// Compute ball centroid in normalised billiard-canvas coordinates (0..1)
	const balls  = this.objects.balls;
	const mainW  = this.context.canvas.width;
	const mainH  = this.context.canvas.height;
	let normX = 0.5, normY = 0.5;
	if (balls.length > 0) {
	    normX = balls.reduce((s, b) => s + b.x, 0) / balls.length / mainW;
	    normY = balls.reduce((s, b) => s + b.y, 0) / balls.length / mainH;
	}

	// Eye geometry — large, centred slightly above middle of the canvas
	const eCX = W / 2;
	const eCY = H * 0.46;
	const ew  = W * 0.74;
	const eh  = H * 0.40;
	const hh  = eh / 2;

	// Iris radius (must match drawObserverEye internals)
	const irisR = hh * 0.56;

	// Pupil offset: map centroid (0..1) → displacement, clamped so the
	// pupil stays visibly inside the iris circle
	const maxDisp = irisR * 0.38;
	const pX = eCX + (normX - 0.5) * 2 * maxDisp;
	const pY = eCY + (normY - 0.5) * 2 * maxDisp;

	drawObserverEye(ctx, eCX, eCY, ew, eh, pX, pY);

	// Label
	ctx.fillStyle = '#666';
	ctx.font = '14px sans-serif';
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillText('observer', W / 2, H - 8);
    }
}


// ── UI wiring ─────────────────────────────────────────────────────────────────

const oobResetBtn   = document.getElementById('observer-outside-reset');
const oobPauseBtn   = document.getElementById('observer-outside-pause');
const oobSkipBtn    = document.getElementById('observer-outside-skip');
const oobInitSel    = document.getElementById('observer-outside-init');

if (oobResetBtn) oobResetBtn.addEventListener('click', () => observerOutsideGame.reset());
if (oobPauseBtn) oobPauseBtn.addEventListener('click', () => observerOutsideGame.togglePause());
if (oobSkipBtn)  oobSkipBtn.addEventListener('click',  () => observerOutsideGame.toggleDraw());
if (oobInitSel) {
    oobInitSel.addEventListener('change', function () {
	observerOutsideGame.initType = this.value;
	observerOutsideGame.reset();
    });
}


// ── Game setup ────────────────────────────────────────────────────────────────
// Prefixed "oob" (observer outside) to avoid collisions with other scripts.

var oobColors = {
    ground: 'rgba(56, 256, 56, 0.8)',
    pin:    'rgba(256, 56, 56, 0.8)',
    ball:   'rgba(200, 200, 200, 0.8)'
};

var oobSimulation = {
    paused:    true,
    gravity:   false,
    drag:      false,
    sound:     false,
    clearCanv: true,
    dt:        1
};

var oobBoundaries = {
    wallBounce:      true,
    floorBounce:     true,
    floorWrap:       false,
    floorWrapCenter: false,
    floorReset:      false
};

var oobParams = {
    inelasticityFactor: 1.0,
    initialSpeed:       5,
    energy:             0.0,
    gravityAccel:       0.06,
    arrowAccel:         0.4,
    stochasticity:      0.0,
    stochasticityScale: 0.2,
    dragFactor:         0.0
};

var oobObjects = {
    balls:     [],
    boxes:     [],
    pits:      [],
    posts:     [],
    membranes: []
};

var oobContext = {
    canvas: document.getElementById('observer-outside-canvas')
};

var observerOutsideGame = new ObserverOutsideGame(
    oobObjects, oobParams, oobSimulation, oobBoundaries, oobContext, oobColors
);
observerOutsideGame.reset();
draw(observerOutsideGame);
