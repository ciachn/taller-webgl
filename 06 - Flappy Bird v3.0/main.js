
import { rad, initCanvas, startRender, drawImageRotated, rand, globals } from './graphics.js';
import { KeyCodes, KeyState, LastKeyState, initKeyb } from './keyb.js';
import { loadImage, loadAudio } from './resources.js';
import ScrollBackground from './scroll-background.js';

const SCROLL_SPEED_BG0 = 1;

const PIPE_UP = 0;
const PIPE_DOWN = 1;

let imgBird;
let imgPipe0;
let imgPipe1;
let imgBg1;
let imgBg0;
let tubos;

let sfxJump;

let fondo1;
let birdY;
let birdVelY;
let firstJump;

initCanvas('canvas', 'black');

function drawPipe (x, y, size, type)
{
	let angle = type == PIPE_UP ? 180 : 0;

	
	size -= imgPipe1.height;
	size /= imgPipe0.height;
	size = Math.ceil(size);
	
	let finalSize = size * imgPipe0.height + imgPipe1.height;
	let origY = y;
	
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

	const g = globals.ctx;
	g.strokeStyle = 'red';
	g.strokeRect(x+8, origY, imgPipe0.width-8*2, finalSize);
}


function draw (g)
{
	fondo1.draw(g);
	fondo1.scroll(SCROLL_SPEED_BG0);

	// Dibujar los tubos.
	let n = tubos.length;
	for (let i = 0; i < n; i++)
	{
		let tubo = tubos[i];
		drawPipe(tubo.x, tubo.y, tubo.size, tubo.type);

		if (firstJump)
			tubo.x += -1.5;

		if (tubo.x + imgPipe0.width < 0 && tubo.type == PIPE_DOWN)
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
	g.drawImage(imgBird, 0.5*globals.width, birdY, 116, 64);
	g.strokeRect(0.5*globals.width + 18, birdY + 8, 116-55, 64 - 8);

	// Aplicar gravedad al pajaro.
	if (firstJump) {
		birdVelY += 1;
		birdY += birdVelY;
		if (birdVelY > 2) birdVelY = 2;
	}

	if (KeyState[KeyCodes.SPACE] == true)
	{
		firstJump = true;
		birdVelY = -3;

		if (!LastKeyState[KeyCodes.SPACE])
		{
			LastKeyState[KeyCodes.SPACE] = true;
			sfxJump.play();
		}
	}
}

async function main()
{
	imgBird = await loadImage('res/bird.png');
	imgBg0 = await loadImage('res/bg-0.png');
	imgBg1 = await loadImage('res/bg-1.png');
	imgPipe0 = await loadImage('res/pipe-0.png');
	imgPipe1 = await loadImage('res/pipe-1.png');

	sfxJump = await loadAudio('res/sfx-jump.mp3');

	fondo1 = new ScrollBackground (imgBg0);

	birdY = 0.5*globals.height - 300;
	birdVelY = 0;
	firstJump = false;

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
