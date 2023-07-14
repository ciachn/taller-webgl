
import Easing from './easing.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;

function drawLoop()
{
	draw();
	requestAnimationFrame(drawLoop);
}

function newOption(value, label)
{
	let opt = document.createElement('option');
	opt.value = value;
	opt.text = label;
	return opt;
}

let easingFn = Easing.Linear.IN;

let easingSelect = document.createElement('select');
document.body.appendChild(easingSelect);

Object.assign(easingSelect.style, {
	position: 'fixed',
	left: '20px',
	top: '20px',
	width: '200px'
});

let easingMap = {
	'Linear': ['Linear', Easing.Linear.IN],
	'Back_In': ['Back (In)', Easing.Back.IN],
	'Back_Out': ['Back (Out)', Easing.Back.OUT],
	'Back_InOut': ['Back (In+Out)', Easing.Back.IN_OUT],
	'Bounce_In': ['Bounce (In)', Easing.Bounce.IN],
	'Bounce_Out': ['Bounce (Out)', Easing.Bounce.OUT],
	'Bounce_InOut': ['Bounce (In+Out)', Easing.Bounce.IN_OUT],
};

for (let value in easingMap) {
	easingSelect.appendChild(newOption(value, easingMap[value][0]));
}

easingSelect.oninput = () => {
	easingFn = easingMap[easingSelect.value][1];
};

function createSlider (x, y, callback)
{
	let input = document.createElement('input');
	document.body.appendChild(input);

	Object.assign(input.style, {
		position: 'fixed',
		left: x + 'px',
		top: y + 'px',
		width: '200px'
	});

	input.type = 'range';
	input.min = 0;
	input.max = 100;
	input.step = 1;
	input.value = 0;

	input.oninput = () => {
		callback(input.value / 100);
	};

	let interval = null;

	input.ondblclick = () => {
		if (interval) return;
		let t = 0;
		interval = setInterval(() => {
			input.value = t;
			input.oninput();
			t += 1;
			if (t > 100) {
				clearInterval(interval);
				interval = setTimeout(() => {
					input.value = 0;
					input.oninput();
					interval = null;
				}, 1000);
			}
		}, 10);
	};
}

function lerp (a0, a1, t)
{
	return t*a1 + (1-t)*a0;
}

const A = 
{
	t: 0,

	x1: 50,
	y1: 40+100,

	x2: 200,
	y2: 40+300,

	init: function()
	{
		createSlider((this.x1+this.x2)*0.5 - 50, 60, (t) => {
			this.t = easingFn(t);
		});
	},

	draw: function(g)
	{
		let x = lerp(this.x1, this.x2, this.t);
		let y = lerp(this.y1, this.y2, this.t);

		g.fillStyle = 'rgba(255,0,0,0.15)';
		g.fillRect(this.x1, this.y1, 100, 100);
		g.fillRect(this.x2, this.y2, 100, 100);

		g.fillStyle = 'rgb(255,0,0)';
		g.fillRect(x, y, 100, 100);
	}
};

const B = 
{
	t: 0,

	x1: 450,
	y1: 40+100,
	angle1: Math.PI*0.1,

	x2: 600,
	y2: 40+400,
	angle2: Math.PI*0.75,

	init: function()
	{
		createSlider((this.x1+this.x2)*0.5 - 50, 60, (t) => {
			this.t = easingFn(t);
		});
	},

	draw: function(g)
	{
		let x = lerp(this.x1, this.x2, this.t);
		let y = lerp(this.y1, this.y2, this.t);
		let angle = lerp(this.angle1, this.angle2, this.t);

		g.fillStyle = 'rgba(0,0,255,0.25)';
		g.save();
		g.translate(this.x1, this.y1);
		g.translate(50, 50);
		g.rotate(this.angle1);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.save();
		g.translate(this.x2, this.y2);
		g.translate(50, 50);
		g.rotate(this.angle2);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.fillStyle = 'rgb(0,0,255)';
		g.save();
		g.translate(x, y);
		g.translate(50, 50);
		g.rotate(angle);
		g.fillRect(-50, -50, 100, 100);
		g.restore();
	}
};

const C = 
{
	t: 0,

	x1: 900,
	y1: 40+500,
	angle1: 0,
	color1: [255, 0, 255],

	x2: 1050,
	y2: 40+100,
	angle2: Math.PI,
	color2: [0, 255, 255],

	init: function()
	{
		createSlider((this.x1+this.x2)*0.5 - 50, 60, (t) => {
			this.t = easingFn(t);
		});
	},

	draw: function(g)
	{
		let x = lerp(this.x1, this.x2, this.t);
		let y = lerp(this.y1, this.y2, this.t);
		let angle = lerp(this.angle1, this.angle2, this.t);
		let color = [
			lerp(this.color1[0], this.color2[0], this.t),
			lerp(this.color1[1], this.color2[1], this.t),
			lerp(this.color1[2], this.color2[2], this.t),
		];

		g.fillStyle = `rgba(${this.color1[0]},${this.color1[1]},${this.color1[2]},0.25)`;
		g.save();
		g.translate(this.x1, this.y1);
		g.translate(50, 50);
		g.rotate(this.angle1);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.fillStyle = `rgba(${this.color2[0]},${this.color2[1]},${this.color2[2]},0.25)`;
		g.save();
		g.translate(this.x2, this.y2);
		g.translate(50, 50);
		g.rotate(this.angle2);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
		g.save();
		g.translate(x, y);
		g.translate(50, 50);
		g.rotate(angle);
		g.fillRect(-50, -50, 100, 100);
		g.restore();
	}
};

const D = 
{
	t: 0,

	x1: 1300,
	y1: 40+60,
	angle1: Math.PI*0.5,
	color1: [0, 255, 0],
	scaleX1: 1,
	scaleY1: 0.6,

	x2: 1500,
	y2: 40+560,
	angle2: Math.PI*1.25,
	color2: [0, 255, 255],
	scaleX2: 0.25,
	scaleY2: 1.5,

	init: function()
	{
		createSlider((this.x1+this.x2)*0.5 - 50, 60, (t) => {
			this.t = easingFn(t);
		});
	},

	draw: function(g)
	{
		let x = lerp(this.x1, this.x2, this.t);
		let y = lerp(this.y1, this.y2, this.t);
		let angle = lerp(this.angle1, this.angle2, this.t);
		let color = [
			lerp(this.color1[0], this.color2[0], this.t),
			lerp(this.color1[1], this.color2[1], this.t),
			lerp(this.color1[2], this.color2[2], this.t),
		];
		let scaleX = lerp(this.scaleX1, this.scaleX2, this.t);
		let scaleY = lerp(this.scaleY1, this.scaleY2, this.t);

		g.fillStyle = `rgba(${this.color1[0]},${this.color1[1]},${this.color1[2]},0.25)`;
		g.save();
		g.translate(this.x1, this.y1);
		g.translate(50, 50);
		g.scale(this.scaleX1, this.scaleY1);
		g.rotate(this.angle1);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.fillStyle = `rgba(${this.color2[0]},${this.color2[1]},${this.color2[2]},0.25)`;
		g.save();
		g.translate(this.x2, this.y2);
		g.translate(50, 50);
		g.scale(this.scaleX2, this.scaleY2);
		g.rotate(this.angle2);
		g.fillRect(-50, -50, 100, 100);
		g.restore();

		g.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
		g.save();
		g.translate(x, y);
		g.translate(50, 50);
		g.scale(scaleX, scaleY);
		g.rotate(angle);
		g.fillRect(-50, -50, 100, 100);
		g.restore();
	}
};

A.init();
B.init();
C.init();
D.init();

function draw()
{
	canvas.width = canvas.width;

	A.draw(ctx);
	B.draw(ctx);
	C.draw(ctx);
	D.draw(ctx);
}

drawLoop();
