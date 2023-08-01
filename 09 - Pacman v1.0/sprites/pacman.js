
import { KeyCodes, KeyState } from '../keyb.js';
import { r } from '../res.js';
import Anim from '../anim.js';

export default class Pacman
{
	animMove;
	animDead;
	anim;
	x; dx;
	y; dy;
	alive;

	constructor (x, y)
	{
		this.x = x;
		this.y = y;

		this.dx = 0;
		this.dy = 0;

		this.alive = true;

		this.animMove = new Anim(r.pacmanMove, 16, 12);
		this.animMove.addSequence('LEFT', [0, 1, 2]);
		this.animMove.addSequence('UP', [3, 4, 5]);
		this.animMove.addSequence('RIGHT', [6, 7, 8]);
		this.animMove.addSequence('DOWN', [9, 10, 11]);
		this.animMove.play('RIGHT');

		this.animDead = new Anim(r.pacmanDead, 16, 12);
		this.animDead.addSequence('DEAD', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

		this.anim = this.animMove;

		setTimeout(() => {
			this.kill();
		}, 5000);
	}

	kill()
	{
		this.alive = false;
		this.anim = this.animDead;
		this.anim.play('DEAD', false);
	}

	draw(g)
	{
		this.anim.draw(g, this.x, this.y);
	}

	update()
	{
		if (!this.alive)
		{
			if (this.anim.finished) {
				alert('Reiniciar Juego');
				this.anim.finished = false;
			}

			return;
		}

		if (this.dx == 0) {
			if (KeyState[KeyCodes.UP]) {
				this.animMove.play('UP');
				this.dy = -1;
			}
			else if (KeyState[KeyCodes.DOWN]) {
				this.animMove.play('DOWN');
				this.dy = 1;
			}
			else
				this.dy = 0;
		}

		if (this.dy == 0) {
			if (KeyState[KeyCodes.LEFT]) {
				this.animMove.play('LEFT');
				this.dx = -1;
			}
			else if (KeyState[KeyCodes.RIGHT]) {
				this.animMove.play('RIGHT');
				this.dx = 1;
			}
			else
				this.dx = 0;
		}

		if (this.dx != 0 || this.dy != 0)
			this.animMove.pause(false);
		else
			this.animMove.pause(true);

		this.x += this.dx;
		this.y += this.dy;
	}
};
