
import { initCanvas, startRender, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';

import Paleta from './obj/paleta.js';
import Pelota from './obj/pelota.js';

initCanvas('canvas', 'black');

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
	// Dibujar los jugadores y la pelota.
	p1.draw(g);
	p2.draw(g);
	ball.draw(g);

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
		juegoIniciado = 0;
		return;
	}

	// Verificar posición de la pelota respecto al jugador 1.
	if (ball.x <= p1.x2)
	{
		if (ball.y >= p1.y && ball.y2 <= p1.y2) {
			ball.x = p1.x2;
			ball.velx *= -1;
		}
	}

	// Verificar posición de la pelota respecto al jugador 2.
	if (ball.x2 >= p2.x)
	{
		if (ball.y >= p2.y && ball.y2 <= p2.y2) {
			ball.x = p2.x - ball.size;
			ball.velx *= -1;
		}
	}
}

startRender(draw);
initKeyb();
