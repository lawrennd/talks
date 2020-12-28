// This code originally written by github user miskimit and released under MIT license as below. 

// https://github.com/miskimit/miskimit.github.io/

// MIT License

// Copyright (c) 2016 miskimit

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


var canvas = document.getElementById("szilard-canvas");
var ctx = canvas.getContext("2d");

var newballButton = document.getElementById("szilard-newball");
var pauseButton = document.getElementById("szilard-pause");

newballButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", togglePause);

var membraneColor = 'rgba(56, 256, 56, 0.8)';
var hotColor = 'rgba(256, 56, 56, 0.8)';
var coldColor = 'rgba(56, 56, 256, 0.8)';


var paused = true;
var gravityOn = false;
var dragOn = false;
var soundOn = false;
var initialSpeed = 5;
var clearCanv = true;

var demonThreshold = 3;

var wallBounce = true;
var floorBounce = true;
var floorWrap = false;
var floorWrapCenter = true;
var floorReset = false;

var energy = 0.0;
var gravityAccel = 0.06;
var arrowAccel = 0.4;
var stochasticity = 0;
var stochasticityScale = 0.2;
var dragFactor = 1;

function incrementEnergy(accel) {
}

function incrementScore() {
}

function ballsBirth() {
    radius = 10;
    var temp = new Ball(i, radius, radius);
    temp.dx = Math.random()*1e-1;
    temp.dy = initialSpeed;
    ballArray[ballArray.length] = temp;    
}


function demonInspect() {
    for (var obj in ballArray) {
	var velocity = Math.sqrt(ballArray[obj].dx*ballArray[obj].dx + ballArray[obj].dy*ballArray[obj].dy);
	if(ballArray[obj].x < canvas.width/2-5-ballArray[obj].radius)
	{
	    if(velocity>demonThreshold){
		ballArray[obj].color = hotColor
		ballArray[obj].membraneImmune = true;
	    } else {
		ballArray[obj].color = coldColor
		ballArray[obj].membraneImmune = false;
	    }
	    
	}
	if(ballArray[obj].x > canvas.width/2+5+ballArray[obj].radius){
	    if(velocity>demonThreshold){
		ballArray[obj].color = hotColor
		ballArray[obj].membraneImmune = false;
	    } else {
		ballArray[obj].color = coldColor
		ballArray[obj].membraneImmune = true;
	    }
	}
    }
}

function resetGame() {
    ballArray = [];
    ballsBirth();
}

membraneArray[membraneArray.length] = new Box(canvas.width/2-5, 0, 5, canvas.height, coldColor);
membraneArray[membraneArray.length] = new Box(canvas.width/2, 0, 5, canvas.height, hotColor);

resetGame();

draw();
