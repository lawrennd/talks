// Copyright (c) 2025 Neil D. Lawrence
//
// ObserverInsideGame: the observer eye sits in the middle of the billiard
// box as a physical obstacle — balls bounce off both the sclera (circular
// Post) and the eyelashes (small Posts at each lash tip).

// ── eye geometry helpers ──────────────────────────────────────────────────────
// (Identical to observer-outside.js; both files define them so that each
//  script is self-contained.  If both are loaded on the same page the second
//  definition harmlessly overwrites the first.)

function _eyePath(ctx, cx, cy, hw, hh) {
    ctx.moveTo(cx - hw, cy);
    ctx.bezierCurveTo(
	cx - 0.4*hw, cy - 1.2*hh,
	cx + 0.4*hw, cy - 1.2*hh,
	cx + hw, cy
    );
    ctx.bezierCurveTo(
	cx + 0.4*hw, cy + 0.55*hh,
	cx - 0.4*hw, cy + 0.55*hh,
	cx - hw, cy
    );
    ctx.closePath();
}

function _upperLidPt(cx, cy, hw, hh, t) {
    const mt = 1 - t;
    return [
	mt*mt*mt*(cx - hw)      + 3*mt*mt*t*(cx - 0.4*hw) + 3*mt*t*t*(cx + 0.4*hw) + t*t*t*(cx + hw),
	mt*mt*mt*cy             + 3*mt*mt*t*(cy - 1.2*hh) + 3*mt*t*t*(cy - 1.2*hh) + t*t*t*cy
    ];
}

function _upperLidTan(cx, cy, hw, hh, t) {
    const mt = 1 - t;
    return [
	3*(mt*mt * 0.6*hw   + 2*mt*t * 0.8*hw  + t*t * 0.6*hw),
	3*(mt*mt * (-1.2*hh) + 2*mt*t * 0      + t*t * 1.2*hh)
    ];
}

// Returns array of lash geometry objects: { bx, by, tipX, tipY, cpX, cpY, lw }
function _getLashData(cx, cy, hw, hh) {
    const tVals = [0.08, 0.20, 0.34, 0.50, 0.66, 0.80, 0.92];
    return tVals.map(t => {
	const [bx, by]  = _upperLidPt(cx, cy, hw, hh, t);
	const [tx, ty]  = _upperLidTan(cx, cy, hw, hh, t);
	const tLen = Math.hypot(tx, ty);
	const nx = ty / tLen;
	const ny = -tx / tLen;

	const falloff = 1 - Math.abs(t - 0.5) * 1.1;
	const len = hh * 0.72 * Math.max(0.45, falloff);
	const lw  = 1.2 + 0.7 * Math.max(0, 1 - Math.abs(t - 0.5) * 1.5);

	const tipX = bx + nx * len;
	const tipY = by + ny * len;
	const cpX  = bx + nx * len * 0.5 + (tx / tLen) * len * 0.12;
	const cpY  = by + ny * len * 0.5 + (ty / tLen) * len * 0.12;

	return { bx, by, tipX, tipY, cpX, cpY, lw };
    });
}

// ── drawing function ──────────────────────────────────────────────────────────
function drawObserverEyeInside(ctx, cx, cy, ew, eh, pupilX, pupilY) {
    const hw = ew / 2, hh = eh / 2;

    ctx.save();
    ctx.beginPath();
    _eyePath(ctx, cx, cy, hw, hh);
    ctx.fillStyle = '#fdfaf4';
    ctx.fill();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    _eyePath(ctx, cx, cy, hw, hh);
    ctx.clip();

    const irisR = hh * 0.62;
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

    ctx.beginPath();
    ctx.arc(pupilX, pupilY, irisR * 0.48, 0, 2 * Math.PI);
    ctx.fillStyle = '#0d0d0d';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(pupilX - irisR * 0.22, pupilY - irisR * 0.22, irisR * 0.15, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.fill();

    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - hw, cy);
    ctx.bezierCurveTo(cx - 0.4*hw, cy - 1.2*hh, cx + 0.4*hw, cy - 1.2*hh, cx + hw, cy);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx + hw, cy);
    ctx.bezierCurveTo(cx + 0.4*hw, cy + 0.55*hh, cx - 0.4*hw, cy + 0.55*hh, cx - hw, cy);
    ctx.strokeStyle = '#666';
    ctx.lineWidth   = 1.2;
    ctx.stroke();
    ctx.restore();

    // Eyelashes
    const lashes = _getLashData(cx, cy, hw, hh);
    ctx.save();
    ctx.lineCap = 'round';
    lashes.forEach(({ bx, by, tipX, tipY, cpX, cpY, lw }) => {
	ctx.beginPath();
	ctx.moveTo(bx, by);
	ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
	ctx.strokeStyle = '#1a1a1a';
	ctx.lineWidth   = lw;
	ctx.stroke();
    });
    ctx.restore();
}


// ── game class ────────────────────────────────────────────────────────────────
class ObserverInsideGame extends MultiGame {

    birth() {
	super.birth();
	// Eye Posts are added once; re-births (reset) clear balls but not posts.
	if (this.objects.posts.length === 0) {
	    this._addEyeObstacle();
	}
    }

    _addEyeObstacle() {
	const W      = this.context.canvas.width;
	const H      = this.context.canvas.height;
	const cx     = W / 2;
	const cy     = H / 2;

	// Circular collision radius for the main sclera
	const postR  = 50;

	// Visual dimensions of the eye
	const eyeEW  = postR * 2.2;   // 110 px wide
	const eyeEH  = postR * 1.5;   // 75 px tall
	const hw     = eyeEW / 2;
	const hh     = eyeEH / 2;

	const ctxRef = this.context;
	const game   = this;

	// ── 1. Main sclera Post (circular, handles most collisions) ──────────
	const eyePost = new Post(ctxRef, cx, cy, postR, 'transparent');

	eyePost.draw = function () {
	    const c = ctxRef.ctx;

	    // Nervous pupil: tracks nearest ball, shifts proportionally to distance
	    const balls = game.objects.balls;
	    let px = this.x, py = this.y;
	    if (balls.length > 0) {
		// Find centroid of all balls
		const bcx = balls.reduce((s, b) => s + b.x, 0) / balls.length;
		const bcy = balls.reduce((s, b) => s + b.y, 0) / balls.length;
		const dx   = bcx - this.x;
		const dy   = bcy - this.y;
		const dist = Math.hypot(dx, dy);
		if (dist > 0) {
		    const irisR   = hh * 0.62;
		    const maxShift = irisR * 0.35;
		    const shift    = Math.min(maxShift, dist * 0.06);
		    px = this.x + (dx / dist) * shift;
		    py = this.y + (dy / dist) * shift;
		}
	    }
	    drawObserverEyeInside(c, this.x, this.y, eyeEW, eyeEH, px, py);
	};

	this.objects.posts.push(eyePost);

	// ── 2. Corner Posts (sharp eye corners are beyond postR) ─────────────
	// The horizontal corners sit at distance hw from centre, which is
	// slightly beyond the circular postR.  Two small Posts bridge the gap.
	[cx - hw, cx + hw].forEach(cornerX => {
	    const cp = new Post(ctxRef, cornerX, cy, 6, 'transparent');
	    cp.draw = function () {};   // purely a physics object
	    this.objects.posts.push(cp);
	}, this);

	// ── 3. Lash-tip Posts (balls bounce off each lash end) ────────────────
	const lashes = _getLashData(cx, cy, hw, hh);
	lashes.forEach(({ tipX, tipY }) => {
	    const lp = new Post(ctxRef, tipX, tipY, 4, 'transparent');
	    lp.draw = function () {};
	    this.objects.posts.push(lp);
	});
    }

    // Suppress the histogram grid — this game uses a single canvas only
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
// Default to 'top' so balls don't spawn inside the eye
observerInsideGame.initType = 'top';
observerInsideGame.reset();
draw(observerInsideGame);
