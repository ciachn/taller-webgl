
import { initCanvas, startRender, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';

import Paleta from './obj/paleta.js';
import Pelota from './obj/pelota.js';

initCanvas('canvas', 'black');

let puntaje1 = 0;
let puntaje2 = 0;

// Crear jugador 1 (rojo) y asignarle sus teclas.
const p1 = new Paleta(100, globals.height*0.5-50, 'red');
p1.setKeys(KeyCodes.W, KeyCodes.S);

// Crear jugador 2 (azul) y asignarle sus teclas.
const p2 = new Paleta(globals.width-100, globals.height*0.5-50, 'blue');
p2.setKeys(KeyCodes.UP, KeyCodes.DOWN);

// Crear pelota.
const ball = new Pelota('yellow');

let juegoIniciado = false;

function draw (g)
{
	// Dibujar la linea divisoria.
	g.fillStyle = '#888';
	g.fillRect(0.5*globals.width, 0, 1, globals.height);

	// Dibujar los jugadores y la pelota.
	p1.draw(g);
	p2.draw(g);
	ball.draw(g);

	// Dibujar el puntaje.
	g.fillStyle = '#ccc';
	g.font = '60px Consolas';

	g.fillText( puntaje1.toString().padStart(2, '0') , 0.5*0.5*globals.width, 100);
	g.fillText( puntaje2.toString().padStart(2, '0') , 0.5*globals.width + 0.5*0.5*globals.width, 100);

	// Actualizar jugadores (cada uno es responsable de sus teclas).
	p1.update();
	p2.update();

	if (!juegoIniciado)
	{
		// Iniciar el juego al presionar ENTER.
		if (KeyState[KeyCodes.ENTER] == 1)
		{
			ball.reset();
			juegoIniciado = 1;
		}

		return;
	}

	// Actualizar movimiento de la pelota.
	ball.update();

	// Si la pelota se salió de la pantalla, reiniciar el juego.
	if (ball.offScreen)
	{
		if (ball.offScreen < 0)
			puntaje2++;
		else
			puntaje1++;

		juegoIniciado = 0;
		return;
	}

	// Verificar posición de la pelota respecto al jugador 1.
	if (ball.x <= p1.x2 && ball.x >= p1.x)
	{
		if ((ball.y >= p1.y && ball.y <= p1.y2) || (ball.y2 >= p1.y && ball.y2 <= p1.y2))
		{
			ball.x = p1.x2;
			ball.velx *= -1;

			if (p1.vely != 0)
				ball.vely = p1.vely;
		}
	}

	// Verificar posición de la pelota respecto al jugador 2.
	if (ball.x2 >= p2.x && ball.x2 <= p2.x2)
	{
		if ((ball.y >= p2.y && ball.y <= p2.y2) || (ball.y2 >= p2.y && ball.y2 <= p2.y2))
		{
			ball.x = p2.x - ball.size;
			ball.velx *= -1;

			if (p2.vely != 0)
				ball.vely = p2.vely;
		}
	}
}

startRender(draw);
initKeyb();
