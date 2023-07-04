
import { initCanvas, startRender, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';
import { loadImage } from './resources.js';

let imgBird;
let imgBg0;
let imgBg1;

let scrollX = 0;

initCanvas('canvas', 'black');

function draw (g)
{
	let cols = Math.ceil(globals.width / imgBg0.width);
	let rows = Math.ceil(globals.height / imgBg0.height);

	let m = 0;

	for (let y = 0; y < rows; y++)
	for (let x = 0; x < cols; x++) {
		let gx = x*imgBg0.width + scrollX;
		g.drawImage(imgBg0, gx, y*imgBg0.height);
		m++;
	}

	if (Math.abs(scrollX) > imgBg0.width)
	{
		let extraCols = Math.ceil(Math.abs(scrollX) / imgBg0.width);

		for (let y = 0; y < rows; y++)
		for (let x = 0; x < extraCols; x++) {
			let gx = x*imgBg0.width + scrollX + cols*imgBg0.width;
			g.drawImage(imgBg0, gx, y*imgBg0.height);
			m++;
		}
	}

	g.drawImage(imgBird, 0.5*globals.height, 0.5*globals.height - 100, 116, 64);

	scrollX += -1;
}

async function main()
{
	imgBird = await loadImage('res/bird.png');
	imgBg0 = await loadImage('res/bg-0.png');
	imgBg1 = await loadImage('res/bg-1.png');


	startRender(draw);
	initKeyb();
}

main();
