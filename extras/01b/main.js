
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;

let t = 0;

function drawLoop()
{
	t += 0.01;
	draw();
	requestAnimationFrame(drawLoop);
}

const ancho = 50;
const alto = 50;

class Rect
{
	x;
	y;
	dx;
	dy;
	ancho;
	alto;
	color;

	constructor (x, y, dx, dy, ancho, alto, color)
	{
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.ancho = ancho;
		this.alto = alto;
		this.color = color;
	}

	draw()
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	}

	update()
	{
		this.x += this.dx;
		this.y += this.dy;
	
		if (this.x < 0) {
			this.x = 0;
			this.dx *= -1;
		} else if (this.x + this.ancho - 1 > W-1) {
			this.x = W - this.ancho;
			this.dx *= -1;
		}
	
		if (this.y < 0) {
			this.y = 0;
			this.dy *= -1;
		} else if (this.y + this.alto - 1 > H-1) {
			this.y = H - this.alto;
			this.dy *= -1;
		}
	}
}

let list = [];

for (let i = 0; i < 100; i++)
{
	let ancho = Math.random()*(80 - 20) + 20;
	let alto = Math.random()*(80 - 20) + 20;
	let x = Math.random()*(W-ancho-1);
	let y = Math.random()*(H-alto-1);
	let dx = Math.random()*(10 - -10) + -10;
	let dy = Math.random()*(10 - -10) + -10;

	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);

	list.push(
		new Rect(x, y, dx, dy, ancho, alto, `rgb(${r},${g},${b})`)
	);
}

function draw()
{
	canvas.width = canvas.width;

	for (let rect of list)
	{
		rect.draw();
		rect.update();
	}
}

drawLoop();
