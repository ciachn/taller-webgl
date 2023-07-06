
import { rad, initCanvas, startRender, drawImageRotated, rand, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';
import { loadImage } from './resources.js';

const SCROLL_SPEED = 1;

const PIPE_UP = 0;
const PIPE_DOWN = 1;

let imgBird;
let imgBg0;
let imgBg1;
let imgPipe0;
let imgPipe1;

let bgMap;
let tubos;
let scrollX;

initCanvas('canvas', 'black');

function drawPipe (x, y, size, type)
{
	let angle = type == PIPE_UP ? 180 : 0;

	size -= imgPipe1.height;
	size /= imgPipe0.height;
	size = Math.ceil(size);

	if (type == PIPE_UP) {
		drawImageRotated (imgPipe1, x, y, angle);
		y += imgPipe1.height;
	}

	while (size--) {
		drawImageRotated (imgPipe0, x, y, angle);
		y += imgPipe0.height;
	}

	if (type == PIPE_DOWN) {
		drawImageRotated (imgPipe1, x, y, angle);
		y += imgPipe1.height;
	}
}

function draw (g)
{
	// Dibujar el fondo.
	for (let line of bgMap)
	for (let tile of line.tiles) {
		g.drawImage(tile.img, tile.x, tile.y);
	}

	scrollX += SCROLL_SPEED;

	// Hacer scroll del fondo.
	for (let line of bgMap)
	{
		line.maxX += -SCROLL_SPEED;

		for (let tile of line.tiles)
		{
			tile.x += -SCROLL_SPEED;

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

	// Dibujar los tubos.
	let n = tubos.length;
	for (let i = 0; i < n; i++)
	{
		let tubo = tubos[i];
		drawPipe(tubo.x, tubo.y, tubo.size, tubo.type);

		tubo.x += -1.5;

		if (tubo.x + imgPipe0.width < 0)
		{
			let space = rand(140, 500);
			let sizDown = rand(200, 400);
			let sizUp = globals.height - space - sizDown;

			tubos.push({ x: globals.width, y: 0, size: sizDown, type: PIPE_DOWN });
			tubos.push({ x: globals.width, y: globals.height-sizUp, size: sizUp, type: PIPE_UP });
		}
	}

	// Remover los tubos que ya se salieron de la pantalla (por la izquierda).
	for (let i = 0; i < tubos.length; i++)
	{
		let tubo = tubos[i];
		if (tubo.x + imgPipe0.width < 0) {
			tubos.splice(i, 1);
			i--;
		}
	}

	// Dibujar el pajaro.
	g.drawImage(imgBird, 0.5*globals.width, 0.5*globals.height - 300, 116, 64);
}

async function main()
{
	imgBird = await loadImage('res/bird.png');
	imgBg0 = await loadImage('res/bg-0.png');
	imgBg1 = await loadImage('res/bg-1.png');
	imgPipe0 = await loadImage('res/pipe-0.png');
	imgPipe1 = await loadImage('res/pipe-1.png');

	// Inicializar el mapa del fondo.
	bgMap = [];

	let cols = 1 + Math.ceil(globals.width / imgBg0.width);
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

	// Inicializar los tubos.
	tubos = [];

	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width, y: 0, size: sizDown, type: PIPE_DOWN });
		tubos.push({ x: globals.width, y: globals.height-sizUp, size: sizUp, type: PIPE_UP });
	}
	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width + 200, y: 0, size: sizDown, type: PIPE_DOWN });
		tubos.push({ x: globals.width + 200, y: globals.height-sizUp, size: sizUp, type: PIPE_UP });
	}
	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width + 400, y: 0, size: sizDown, type: PIPE_DOWN });
		tubos.push({ x: globals.width + 400, y: globals.height-sizUp, size: sizUp, type: PIPE_UP });
	}


	startRender(draw);
	initKeyb();
}

main();
