// Copyright (c) 2025 Neil D. Lawrence
//
// ObserverInsideGame: the observer eye is placed INSIDE the billiard box as
// a circular Post obstacle.  Balls bounce off it elastically.  The pupil
// tracks the centroid of all balls — and gets increasingly nervous as the
// crowd approaches.

// ── shared eye-drawing helper (same as observer-outside.js) ──────────────────
function drawObserverEyeInside(ctx, cx, cy, ew, eh, pupilX, pupilY) {
    const hw = ew / 2, hh = eh / 2;
    ctx.save();

    // Sclera
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, 2 * Math.PI);
    ctx.fillStyle = '#fdfaf4';
    ctx.fill();
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Clip iris & pupil to eye ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw, hh, 0, 0, 2 * Math.PI);
    ctx.clip();

    // Iris
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
class ObserverInsideGame extends MultiGame {

    birth() {
	// Let MultiGame.birth() place and initialise the balls.
	super.birth();

	// Add the eye obstacle only on the very first birth() call —
	// reset() clears balls but never touches posts, so the eye persists.
	if (this.objects.posts.length === 0) {
	    this._addEyeObstacle();
	}
    }

    _addEyeObstacle() {
	const W      = this.context.canvas.width;
	const H      = this.context.canvas.height;
	const postR  = 44;          // collision radius
	const eyeEW  = postR * 2.3; // visual eye width  (wider than tall)
	const eyeEH  = postR * 1.6; // visual eye height
	const ctxRef = this.context;
	const game   = this;

	const eyePost = new Post(ctxRef, W / 2, H / 2, postR, 'transparent');

	// Replace the default filled-circle draw with an eye.
	eyePost.draw = function () {
	    const ctx = ctxRef.ctx;

	    // Pupil tracks the centroid of the balls
	    const balls = game.objects.balls;
	    let px = this.x, py = this.y;

	    if (balls.length > 0) {
		const bcx = balls.reduce((s, b) => s + b.x, 0) / balls.length;
		const bcy = balls.reduce((s, b) => s + b.y, 0) / balls.length;
		const dx   = bcx - this.x;
		const dy   = bcy - this.y;
		const dist = Math.hypot(dx, dy);
		if (dist > 0) {
		    // Pupil moves up to 35% of iris radius toward the centroid
		    const irisR   = (eyeEH / 2) * 0.56;
		    const maxShift = irisR * 0.35;
		    const shift    = Math.min(maxShift, dist * 0.08);
		    px = this.x + (dx / dist) * shift;
		    py = this.y + (dy / dist) * shift;
		}
	    }

	    drawObserverEyeInside(ctx, this.x, this.y, eyeEW, eyeEH, px, py);
	};

	this.objects.posts.push(eyePost);
    }

    // The grid canvas doesn't exist for this variant — suppress the lookup.
    drawGrid() {}
}


// ── UI wiring ─────────────────────────────────────────────────────────────────

const oibResetBtn = document.getElementById('observer-inside-reset');
const oibPauseBtn = document.getElementById('observer-inside-pause');
const oibSkipBtn  = document.getElementById('observer-inside-skip');
const oibInitSel  = document.getElementById('observer-inside-init');

if (oibResetBtn) oibResetBtn.addEventListener('click', () => observerInsideGame.reset());
if (oibPauseBtn) oibPauseBtn.addEventListener('click', () => observerInsideGame.togglePause());
if (oibSkipBtn)  oibSkipBtn.addEventListener('click',  () => observerInsideGame.toggleDraw());
if (oibInitSel) {
    oibInitSel.addEventListener('change', function () {
	observerInsideGame.initType = this.value;
	observerInsideGame.reset();
    });
}


// ── Game setup ────────────────────────────────────────────────────────────────
// Prefixed "oib" (observer inside) to avoid collisions with other scripts.

var oibColors = {
    ground: 'rgba(56, 256, 56, 0.8)',
    pin:    'rgba(256, 56, 56, 0.8)',
    ball:   'rgba(200, 200, 200, 0.8)'
};

var oibSimulation = {
    paused:    true,
    gravity:   false,
    drag:      false,
    sound:     false,
    clearCanv: true,
    dt:        1
};

var oibBoundaries = {
    wallBounce:      true,
    floorBounce:     true,
    floorWrap:       false,
    floorWrapCenter: false,
    floorReset:      false
};

var oibParams = {
    inelasticityFactor: 1.0,
    initialSpeed:       5,
    energy:             0.0,
    gravityAccel:       0.06,
    arrowAccel:         0.4,
    stochasticity:      0.0,
    stochasticityScale: 0.2,
    dragFactor:         0.0
};

var oibObjects = {
    balls:     [],
    boxes:     [],
    pits:      [],
    posts:     [],
    membranes: []
};

var oibContext = {
    canvas: document.getElementById('observer-inside-canvas')
};

var observerInsideGame = new ObserverInsideGame(
    oibObjects, oibParams, oibSimulation, oibBoundaries, oibContext, oibColors
);
observerInsideGame.reset();
draw(observerInsideGame);
