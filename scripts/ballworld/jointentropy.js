// Copyright (c) 2024 Neil D. Lawrence

class JointEntropy extends Game {
    constructor(objects, params, simulation, boundaries, context, colors) {
	super(objects, params, simulation, boundaries, context, colors);
	this.nbins = 20;
	this.vmin = -20;
	this.vmax = 20;
	this.vstep = (this.vmax - this.vmin) / this.nbins;
    }

    binIndex(v) {
	const idx = Math.floor((v - this.vmin) / this.vstep);
	return Math.max(0, Math.min(this.nbins - 1, idx));
    }

    birth() {
	var radius = 10;
	// Collect x positions first so we can distribute angles evenly
	var positions = [];
	for (var x = 3*radius; x < this.context.canvas.width; x += 2*radius + 1) {
	    positions.push(x);
	}
	var N = positions.length;
	for (var k = 0; k < N; k++) {
	    var temp = new Ball(this.context, positions[k], radius, radius);
	    // Circular initial velocities: all balls have the same speed but
	    // uniformly spread directions.  This creates strong correlation
	    // between vx and vy (they lie on a circle), giving high I(vx;vy)
	    // initially.  As collisions thermalise the gas the velocity
	    // components become independent and I(vx;vy) → 0.
	    var angle = k * 2 * Math.PI / N;
	    temp.dx = this.params.initialSpeed * Math.sin(angle);
	    temp.dy = this.params.initialSpeed * Math.cos(angle);
	    temp.color = this.colors.ball;
	    this.objects.balls.push(temp);
	}
    }

    reset() {
	this.objects.balls = [];
	this.birth();
    }

    demon() {
	const n = this.nbins;
	const N = this.objects.balls.length;
	if (N === 0) return;

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

	document.getElementById("jointentropy-hx").value    = Hx.toFixed(3);
	document.getElementById("jointentropy-hy").value    = Hy.toFixed(3);
	document.getElementById("jointentropy-hxphy").value = (Hx + Hy).toFixed(3);
	document.getElementById("jointentropy-hxy").value   = Hxy.toFixed(3);
	document.getElementById("jointentropy-mi").value    = MI.toFixed(3);

	if (this.simulation.time % 1000 == 0) {
	    this.simulation.draw = true;
	}
    }
}


// ── UI wiring ────────────────────────────────────────────────────────────────

let jeNewBallButton = document.getElementById("jointentropy-newball");
let jePauseButton   = document.getElementById("jointentropy-pause");
let jeSkipButton    = document.getElementById("jointentropy-skip");

jeNewBallButton.addEventListener("click", function() { jointentropy.reset(); });
jePauseButton.addEventListener("click",   function() { jointentropy.togglePause(); });
jeSkipButton.addEventListener("click",    function() { jointentropy.toggleDraw(); });


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
    dragFactor:         0.0
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
