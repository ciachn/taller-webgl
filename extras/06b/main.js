
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const W = canvas.width;
const H = canvas.height;

function drawLoop()
{
	canvas.width = canvas.width;
	draw(ctx);
	requestAnimationFrame(drawLoop);
}

let rects = [
	{ x: 300+100, y: 150+100, width: 100, height: 50, color: 'blue' },
	{ x: 300+150, y: 150+400, width: 50, height: 100, color: 'blue' },
	{ x: 300+350, y: 150+170, width: 250, height: 250, color: 'blue' },
	{ x: 300+450, y: 150+470, width: 450, height: 150, color: 'blue' },
	{ x: 300+750, y: 150+70, width: 50, height: 350, color: 'blue' },
	{ x: 300+950, y: 150+190, width: 50, height: 350, color: 'blue' },
	{ x: 300+850, y: 150+50, width: 350, height: 50, color: 'blue' },
	{ x: 300+1050, y: 150+350, width: 10, height: 10, color: 'blue' },
	{ x: 300+1100, y: 150+370, width: 10, height: 10, color: 'blue' },
];

let rect0 = { x: 700, y: 900, width: 25, height: 100, color: 'red' };

self.onpointermove = (evt) => {
	rect0.x = evt.clientX - rect0.width*0.5;
	rect0.y = evt.clientY - rect0.height*0.5;
};

function collides (rect0, rect1)
{
	let Ax1 = rect0.x;
	let Ay1 = rect0.y;
	let Ax2 = rect0.x + rect0.width-1;
	let Ay2 = rect0.y + rect0.height-1;

	let Bx1 = rect1.x;
	let By1 = rect1.y;
	let Bx2 = rect1.x + rect1.width-1;
	let By2 = rect1.y + rect1.height-1;

	let x1 = Math.max(Ax1, Bx1);
	let x2 = Math.min(Ax2, Bx2);

	let y1 = Math.max(Ay1, By1);
	let y2 = Math.min(Ay2, By2);

	let dx = x2 - x1;
	let dy = y2 - y1;

	if (dx >= 0 && dy >= 0)
		return true;
	else
		return false;
}

function draw(g)
{
	for (let rect of rects) {
		g.strokeStyle = rect.color;
		g.fillStyle = '#f0f';

		if (collides(rect, rect0))
			g.fillRect(rect.x, rect.y, rect.width, rect.height);
		else
			g.strokeRect(rect.x, rect.y, rect.width, rect.height);
	}

	g.strokeStyle = rect0.color;
	g.strokeRect(rect0.x, rect0.y, rect0.width, rect0.height);
}

drawLoop();
