
import { initCanvas, startRender, globals } from './graphics.js';
import { KeyCodes, KeyState, initKeyb } from './keyb.js';

import Paleta from './obj/paleta.js';
import Pelota from './obj/pelota.js';

initCanvas('canvas', 'black');

const P1 = new Paleta(100, globals.height*0.5-50, 'red');
P1.setKeys(KeyCodes.W, KeyCodes.S);

const P2 = new Paleta(globals.width-100, globals.height*0.5-50, 'blue');
P2.setKeys(KeyCodes.UP, KeyCodes.DOWN);

const B = new Pelota('yellow');

let juegoIniciado = false;

function draw (g)
{
	P1.draw(g);
	P2.draw(g);
	B.draw(g);

	P1.update();
	P2.update();

	if (juegoIniciado)
	{
		B.update();

		if (B.offScreen)
		{
			juegoIniciado = 0;
		}
		else
		{
			if (B.x <= P1.x2)
			{
				if (B.y >= P1.y && B.y2 <= P1.y2) {
					B.x = P1.x2;
					B.velx *= -1;
				}
			}
			else if (B.x2 >= P2.x)
			{
				if (B.y >= P2.y && B.y2 <= P2.y2) {
					B.x = P2.x - 24;
					B.velx *= -1;
				}
			}
		}
	}

	if (!juegoIniciado && KeyState[KeyCodes.ENTER] == 1)
	{
		B.reset();
		juegoIniciado = 1;
	}
}

startRender(draw);
initKeyb();
