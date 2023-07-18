
import { rad, initCanvas, startRender, drawImageRotated, rand, intersection, globals } from './graphics.js';
import { KeyCodes, KeyState, LastKeyState, initKeyb } from './keyb.js';
import { loadImage, loadAudio } from './resources.js';
import ScrollBackground from './scroll-background.js';

const AUDIO_DISABLED = true;
const SHOW_HITBOX = true;

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
let sfxScore;
let sfxDead;
let musicLevel1;

let fondo1;
let birdY;
let birdVelY;
let firstJump;
let puntaje;
let enabled;

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

	let rectB = {
		x: x+8,
		y: origY, 
		width: imgPipe0.width-8*2,
		height: finalSize
	};

	if (SHOW_HITBOX) {
		const g = globals.ctx;
		g.strokeStyle = 'red';
		g.strokeRect(rectB.x, rectB.y, rectB.width, rectB.height);
	}

	return rectB;
}

function draw (g)
{
	fondo1.draw(g);

	if (enabled)
		fondo1.scroll(SCROLL_SPEED_BG0);

	// Rectangulo del pajaro.
	let rectA = {
		x: 0.5*globals.width + 18, 
		y: birdY + 8, 
		width: 116-55, 
		height: 64 - 8
	};

	// Dibujar los tubos.
	let n = tubos.length;
	for (let i = 0; i < n; i++)
	{
		let tubo = tubos[i];
		let rectB = drawPipe(tubo.x, tubo.y, tubo.size, tubo.type);

		if (enabled && intersection(rectA, rectB))
		{
			if (!AUDIO_DISABLED) {
				musicLevel1.pause();
				sfxDead.play();
			}

			enabled = false;

			setTimeout(() => {
				restart();
			},
			1500); // 1500ms => 1.5s

			return;
		}

		if (enabled && firstJump)
		{
			tubo.x += -1.5;

			if (tubo.x + imgPipe0.width < 0 && tubo.type == PIPE_DOWN)
			{
				let space = rand(140, 500);
				let sizDown = rand(200, 400);
				let sizUp = globals.height - space - sizDown;

				tubos.push({ x: globals.width, y: 0, size: sizDown, type: PIPE_DOWN, used: false });
				tubos.push({ x: globals.width, y: globals.height-sizUp, size: sizUp, type: PIPE_UP, used: false });
			}
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

	// Verificar si el pajaro pasó por el tubo más a la izquierda (que no haya sido marcado como usado).
	if (enabled)
	{
		let birdX = rectA.x + 0.5*rectA.width;

		for (let i = 0; i < tubos.length; i++)
		{
			let tubo = tubos[i];
			if (tubo.type != PIPE_DOWN || tubo.used == true) continue;

			if (birdX >= tubo.x)
			{
				if (!AUDIO_DISABLED) sfxScore.play();

				tubo.used = true;
				puntaje++;
			}
		}
	}

	// Dibujar el puntaje.
	g.font = 'bold 50pt Arial';
	g.shadowBlur = 4;
	g.shadowOffsetY = 2;
	g.shadowColor = 'black';
	g.fillStyle = 'white';
	g.fillText(puntaje.toString().padStart(2, '0'), 0.5*globals.width, 80);
	g.shadowOffsetY = 0;
	g.shadowBlur = 0;

	// Dibujar el pajaro.
	g.drawImage(imgBird, 0.5*globals.width, birdY, 116, 64);

	if (SHOW_HITBOX) {
		g.strokeStyle = 'red';
		g.strokeRect(rectA.x, rectA.y, rectA.width, rectA.height);
	}

	if (!enabled) return;

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
			if (!AUDIO_DISABLED) sfxJump.play();
		}
	}
}

function restart()
{
	enabled = true;

	birdY = 0.5*globals.height - 300;
	birdVelY = 0;
	firstJump = false;
	puntaje = 0;

	musicLevel1.currentTime = 0;
	musicLevel1.volume = 0.2;
	musicLevel1.loop = true;
	if (!AUDIO_DISABLED) musicLevel1.play();

	fondo1.reset();

	// Inicializar los tubos.
	tubos = [];

	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width, y: 0, size: sizDown, type: PIPE_DOWN, used: false });
		tubos.push({ x: globals.width, y: globals.height-sizUp, size: sizUp, type: PIPE_UP, used: false });
	}
	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width + 200, y: 0, size: sizDown, type: PIPE_DOWN, used: false });
		tubos.push({ x: globals.width + 200, y: globals.height-sizUp, size: sizUp, type: PIPE_UP, used: false });
	}
	{
		let space = rand(140, 500);
		let sizDown = rand(200, 400);
		let sizUp = globals.height - space - sizDown;
		tubos.push({ x: globals.width + 400, y: 0, size: sizDown, type: PIPE_DOWN, used: false });
		tubos.push({ x: globals.width + 400, y: globals.height-sizUp, size: sizUp, type: PIPE_UP, used: false });
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
	sfxScore = await loadAudio('res/sfx-score.mp3');
	sfxDead = await loadAudio('res/sfx-dead.mp3');
	musicLevel1 = await loadAudio('res/music-level-1.mp3');

	fondo1 = new ScrollBackground (imgBg0);

	restart();

	startRender(draw);
	initKeyb();
}

main();
