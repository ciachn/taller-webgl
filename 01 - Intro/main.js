
function rad(angle) {
	return Math.PI*(angle/180);
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;

function drawTriangle (a)
{
	let R = a * Math.sqrt(3)/3;

	let x1 = 0 + R * Math.cos(rad(90));
	let y1 = 0 + R * -Math.sin(rad(90));

	let x2 = x1 + a * Math.cos(rad(180+60));
	let y2 = y1 + a * -Math.sin(rad(180+60));

	let x3 = x2 + a * Math.cos(rad(0));
	let y3 = y2 + a * -Math.sin(rad(0));

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.closePath();
	
	ctx.strokeStyle = '#000';
	ctx.stroke();
}

// Centro de la pantalla.
const cx = W/2;
const cy = H/2;

let t = 0;

function draw(cx, cy, t)
{
	for (let a = 10; a < 500; a += 10)
	{
		ctx.save();

		ctx.translate(cx, cy);
		ctx.rotate( ((a-10)/500)*2.0 + t );
		drawTriangle( a );

		ctx.restore();
	}
}

function drawLoop()
{
	canvas.width = canvas.width;

	t += 0.015;

	const k = 250;

	for (let y = -3; y <= 3; y++)
	for (let x = -3; x <= 3; x++)
		draw(cx - x*k, cy - y*k, t);

	requestAnimationFrame(drawLoop);
}

drawLoop();
