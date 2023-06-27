
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

let x = 200;
let y = 200;

let dx = 5;
let dy = 5;

function draw()
{
	canvas.width = canvas.width;

	ctx.fillStyle = 'red';
	ctx.fillRect(x, y, ancho, alto);

	x += dx;
	y += dy;

	if (x < 0) {
		x = 0;
		dx *= -1;
	} else if (x+ancho-1 > W-1) {
		x = W-ancho;
		dx *= -1;
	}

	if (y < 0) {
		y = 0;
		dy *= -1;
	} else if (y+alto-1 > H-1) {
		y = H-alto;
		dy *= -1;
	}

	/* let x_max = x + ancho-1;
	if (x_max+dx < W-1)
		x += dx;
	else
		dx = -dx;

	if (x+dx > 0)
		x += dx;
	else
		dx = -dx;

	let y_max = y + alto - 1;
	if (y_max+dy < H-1)
		y += dy;
	else
		dy = -dy;

	if (y+dy > 0)
		y += dy;
	else
		dy = -dy; */
}

drawLoop();
