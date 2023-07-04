
import { initCanvas, startRender, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';
import { loadImage } from './resources.js';

let imgBird;
let imgBg0;
let imgBg1;

let bgMap;
let scrollX;

initCanvas('canvas', 'black');

function draw (g)
{
	// Dibujar el fondo.
	for (let line of bgMap)
	for (let tile of line.tiles) {
		g.drawImage(tile.img, tile.x, tile.y);
	}

	// Hacer scroll del fondo.
	scrollX += 3;

	for (let line of bgMap)
	{
		line.maxX += -3;

		for (let tile of line.tiles)
		{
			tile.x += -3;

			if (tile.x+tile.img.width < 0)
			{
				/* if (scrollX > 3000)
				{
					tile.img = imgBg1;
				} */

				tile.x = line.maxX;
				line.maxX += tile.img.width;
			}
		}
	}

	g.drawImage(imgBird, 0.5*globals.height, 0.5*globals.height - 100, 116, 64);
}

async function main()
{
	imgBird = await loadImage('res/bird.png');
	imgBg0 = await loadImage('res/bg-0.png');
	imgBg1 = await loadImage('res/bg-1.png');

	// Inicializar el mapa del fondo.
	bgMap = [];

	let cols = Math.ceil(globals.width / imgBg0.width);
	let lines = Math.ceil(globals.height / imgBg0.height);
	scrollX = 0;

	for (let j = 0; j < lines; j++)
	{
		let bgLine = { tiles: [], maxX: 0 };
		bgMap.push(bgLine);

		for (let i = 0; i < cols; i++)
		{
			let tile = { img: imgBg0, x: i*imgBg0.width, y: j*imgBg0.height };
			bgLine.tiles.push(tile);
		}

		bgLine.maxX = bgLine.tiles.at(-1).x + bgLine.tiles.at(-1).img.width;
	}

	startRender(draw);
	initKeyb();
}

main();
