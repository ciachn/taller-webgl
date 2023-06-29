
import { KeyState } from '../keyb.js';

const W = 24;
const H = 100;

export default class Paleta
{
	x;
	y;
	x2;
	y2;
	color;

	keyUp;
	keyDown;

	constructor (x, y, color)
	{
		this.x = x;
		this.y = y;
		this.x2 = x + W;
		this.y2 = y + H;
		this.color = color;
	}

	setKeys (keyUp, keyDown)
	{
		this.keyUp = keyUp;
		this.keyDown = keyDown;
	}

	draw (g)
	{
		g.fillStyle = this.color;
		g.fillRect(this.x, this.y, W, H);
	}

	update ()
	{
		if (KeyState[this.keyUp] == 1)
			this.y -= 5;

		if (KeyState[this.keyDown] == 1)
			this.y += 5;

		this.x2 = this.x + W;
		this.y2 = this.y + H;
	}
}
