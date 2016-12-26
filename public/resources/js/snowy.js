"use strict";
document.addEventListener('load', function(){
	var canvas = document.getElementById("playground");
	var ctx = canvas.getContext("2d");

	var intervalId = null;

	var particles = [];

	var COLOUR = "rgba(255, 255, 255, %a)";
	var MOUSE_SENSITIVITY = 100;
	var MIN_SIZE = 5;
	var MAX_SIZE = 15;

	var mouseX = canvas.width / 2;
	var middleX;

	function reset(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		particles = [];
		middleX = canvas.width / 2;
		init();
	}

	function init(){
		if(intervalId !== null){
			clearInterval(intervalId);
		}

		intervalId = setInterval(update, 50);
	}

	function update(){
		quria();
		createParticle(random(-100, canvas.width + 100), 0, random(MIN_SIZE, MAX_SIZE), COLOUR, 200, -0.001, 10);

		for(var particleId in particles){
			if (!particles.hasOwnProperty(particleId)) continue;

			particles[particleId].update();
		}
	}

	function random(min, max){
		if(min > max){
			var originalMax = max;
			max = min;
			min = originalMax;
		}

		return Math.floor(Math.random() * ((max - min) + 1)) + min;
	}

	function quria(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function createParticle(x, y, size, color, age, grow, ygrow){
		var id = particles.length;

		particles[id] = {
			x: x,
			y: y,
			size: size,
			color: color,
			maxAge: age,
			grow: grow,
			ygrow: ygrow,
			currentAge: 0,
			id: id,
			dropped: false,
			sensitivity: random(0, 100),
			randomizedMovement: random(-50, 50) / 50,

			update: function(){
				this.size += this.grow;

				if(!this.dropped) this.y += ygrow;

				if(this.dropped) this.size += this.grow * 100;
				if(!this.dropped) this.x += ((middleX - mouseX) / (MOUSE_SENSITIVITY + this.sensitivity) + this.randomizedMovement);

				if(this.y > canvas.height){
					this.y = canvas.height;
					this.dropped = true;
				}

				if(this.size < 0){
					this.size = 0;
					particles.splice(this.id, 1);
					refineId();
					return;
				}

				var blur = ctx.createRadialGradient(
					this.x,
					this.y,
					0,
					this.x,
					this.y,
					this.size
				);
				blur.addColorStop(0, this.color.replace("%a", "1"));
				blur.addColorStop(0.8, this.color.replace("%a", "0.8"));
				blur.addColorStop(1, this.color.replace("%a", "0"));

				ctx.fillStyle = blur;

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fill();
				/*this.currentAge++;

				if(this.currentAge >= this.maxAge){
					particles.splice(this.id, 1);
				}*/
			}
		};
	}

	function mouseMove(event){
		mouseX = event.pageX;
	}

	function refineId(){
		for(var particle in particles){
			if(!particles.hasOwnProperty(particle)) continue;

			particles[particle].id = particle;
		}
	}
	
	window.addEventListener('deviceorientation', function(event) {
		mouseX = canvas.width / 2 + event.gamma;
	});

	$(document).on('resize', function(){
		reset();
	});
	reset();
});
