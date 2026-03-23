// Copyright (c) 2025 Neil D. Lawrence
//
// ObserverOutsideGame: same nine-ball billiard as MultiGame, but the
// histogram grid panel is replaced by a large observer eye that watches
// the simulation from outside.  The pupil tracks the centroid of all balls.

// ── eye geometry helpers ──────────────────────────────────────────────────────
// The eye uses two cubic bezier curves meeting at sharp corner points:
//   upper lid  :  (cx-hw, cy)  →  (cx-0.4hw, cy-1.2hh)  →  (cx+0.4hw, cy-1.2hh)  →  (cx+hw, cy)
//   lower lid  :  (cx+hw, cy)  →  (cx+0.4hw, cy+0.55hh) →  (cx-0.4hw, cy+0.55hh) →  (cx-hw, cy)

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

// Point on the upper lid bezier at parameter t ∈ [0,1]
function _upperLidPt(cx, cy, hw, hh, t) {
    const mt = 1 - t;
    return [
	mt*mt*mt*(cx - hw)      + 3*mt*mt*t*(cx - 0.4*hw) + 3*mt*t*t*(cx + 0.4*hw) + t*t*t*(cx + hw),
	mt*mt*mt*cy             + 3*mt*mt*t*(cy - 1.2*hh) + 3*mt*t*t*(cy - 1.2*hh) + t*t*t*cy
    ];
}

// Tangent vector of the upper lid bezier at parameter t (not normalised)
function _upperLidTan(cx, cy, hw, hh, t) {
    // dB/dt = 3 [ mt²(P1-P0) + 2mt·t(P2-P1) + t²(P3-P2) ]
    const mt = 1 - t;
    return [
	3*(mt*mt * 0.6*hw  + 2*mt*t * 0.8*hw  + t*t * 0.6*hw),
	3*(mt*mt * (-1.2*hh) + 2*mt*t * 0    + t*t * 1.2*hh)
    ];
}

// Lash geometry: returns array of { bx, by, tipX, tipY, cpX, cpY, lw }
// outward normal = (ty, -tx) / |tan|  (points away from eye for upper lid)
function _getLashData(cx, cy, hw, hh) {
    const tVals = [0.08, 0.20, 0.34, 0.50, 0.66, 0.80, 0.92];
    return tVals.map(t => {
	const [bx, by]  = _upperLidPt(cx, cy, hw, hh, t);
	const [tx, ty]  = _upperLidTan(cx, cy, hw, hh, t);
	const tLen = Math.hypot(tx, ty);
	const nx = ty / tLen;    // outward normal x
	const ny = -tx / tLen;   // outward normal y

	// Length decreases toward corners
	const falloff = 1 - Math.abs(t - 0.5) * 1.1;
	const len = hh * 0.72 * Math.max(0.45, falloff);

	// Line width: thicker at centre
	const lw = 1.2 + 0.7 * Math.max(0, 1 - Math.abs(t - 0.5) * 1.5);

	const tipX = bx + nx * len;
	const tipY = by + ny * len;

	// Control point: slight curve in the tangent direction
	const cpX = bx + nx * len * 0.5 + (tx / tLen) * len * 0.12;
	const cpY = by + ny * len * 0.5 + (ty / tLen) * len * 0.12;

	return { bx, by, tipX, tipY, cpX, cpY, lw };
    });
}

// ── main drawing function ─────────────────────────────────────────────────────
function drawObserverEye(ctx, cx, cy, ew, eh, pupilX, pupilY) {
    const hw = ew / 2, hh = eh / 2;

    // 1. Sclera fill + thin outline
    ctx.save();
    ctx.beginPath();
    _eyePath(ctx, cx, cy, hw, hh);
    ctx.fillStyle = '#fdfaf4';
    ctx.fill();
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 2. Iris and pupil — clipped to eye shape
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

    ctx.restore();  // remove clip

    // 3. Upper eyelid line (thicker, redraw over iris)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - hw, cy);
    ctx.bezierCurveTo(cx - 0.4*hw, cy - 1.2*hh, cx + 0.4*hw, cy - 1.2*hh, cx + hw, cy);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.stroke();

    // Lower eyelid line (thinner, softer)
    ctx.beginPath();
    ctx.moveTo(cx + hw, cy);
    ctx.bezierCurveTo(cx + 0.4*hw, cy + 0.55*hh, cx - 0.4*hw, cy + 0.55*hh, cx - hw, cy);
    ctx.strokeStyle = '#666';
    ctx.lineWidth   = 1.2;
    ctx.stroke();
    ctx.restore();

    // 4. Eyelashes
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
class ObserverOutsideGame extends MultiGame {

    drawGrid() {
	const gc = document.getElementById('observer-outside-eye');
	if (!gc) return;
	const ctx = gc.getContext('2d');
	const W = gc.width, H = gc.height;

	ctx.clearRect(0, 0, W, H);
	ctx.fillStyle = '#f5f0e8';
	ctx.fillRect(0, 0, W, H);

	// Map ball centroid to normalised coords (0–1)
	const balls = this.objects.balls;
	const mainW = this.context.canvas.width;
	const mainH = this.context.canvas.height;
	let normX = 0.5, normY = 0.5;
	if (balls.length > 0) {
	    normX = balls.reduce((s, b) => s + b.x, 0) / balls.length / mainW;
	    normY = balls.reduce((s, b) => s + b.y, 0) / balls.length / mainH;
	}

	// Eye dimensions — large, centred slightly above mid-canvas
	const eCX = W / 2;
	const eCY = H * 0.46;
	const ew  = W * 0.74;
	const eh  = H * 0.38;
	const hh  = eh / 2;

	const irisR  = hh * 0.62;
	const maxDisp = irisR * 0.38;
	const pX = eCX + (normX - 0.5) * 2 * maxDisp;
	const pY = eCY + (normY - 0.5) * 2 * maxDisp;

	drawObserverEye(ctx, eCX, eCY, ew, eh, pX, pY);

	ctx.fillStyle    = '#666';
	ctx.font         = '14px sans-serif';
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'bottom';
	ctx.fillText('observer', W / 2, H - 8);
    }
}


// ── UI wiring ─────────────────────────────────────────────────────────────────

const oobResetBtn = document.getElementById('observer-outside-reset');
const oobPauseBtn = document.getElementById('observer-outside-pause');
const oobSkipBtn  = document.getElementById('observer-outside-skip');
const oobInitSel  = document.getElementById('observer-outside-init');

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
