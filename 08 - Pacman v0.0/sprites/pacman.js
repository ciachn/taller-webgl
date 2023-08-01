
import { KeyCodes, KeyState } from '../keyb.js';
import { r } from '../res.js';

const LEFT = [0, 1, 2];
const UP = [3, 4, 5];
const RIGHT = [6, 7, 8];
const DOWN = [9, 10, 11];

export default class Pacman
{
	x; dx;
	y; dy;

	anim;
	animIndex;
	animDelay;

	constructor (x, y)
	{
		this.x = x;
		this.y = y;

		this.dx = 0;
		this.dy = 0;

		this.anim = RIGHT;
		this.animIndex = 0;
		this.animDelay = 0;
	}

	draw(g)
	{
		g.drawImage(r.pacmanMove,
			this.anim[this.animIndex]*16, 0, 16, 16,
			this.x, this.y, 16, 16);

		if (this.dx != 0 || this.dy != 0)
		{
			this.animDelay--;
			if (this.animDelay <= 0) {
				this.animIndex++;
				if (this.animIndex >= this.anim.length)
					this.animIndex = 0;
				this.animDelay = 10;
			}
		}
	}

	update()
	{
		if (this.dx == 0) {
			if (KeyState[KeyCodes.UP]) {
				this.anim = UP;
				this.dy = -1;
			}
			else if (KeyState[KeyCodes.DOWN]) {
				this.anim = DOWN;
				this.dy = 1;
			}
			else
				this.dy = 0;
		}

		if (this.dy == 0) {
			if (KeyState[KeyCodes.LEFT]) {
				this.anim = LEFT;
				this.dx = -1;
			}
			else if (KeyState[KeyCodes.RIGHT]) {
				this.anim = RIGHT;
				this.dx = 1;
			}
			else
				this.dx = 0;
		}

		this.x += this.dx;
		this.y += this.dy;
	}
};
