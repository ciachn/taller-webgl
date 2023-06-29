
import { globals } from '../graphics.js';
import { KeyState } from '../keyb.js';

const W = 24;
const H = 24;

export default class Pelota
{
	x;
	x2;
	y;
	y2;
	color;

	velx;
	vely;

	offScreen;

	constructor (color)
	{
		this.x = 0.5*globals.width - 0.5*W;
		this.y = 0.5*globals.height - 0.5*H;
		this.x2 = this.x + W;
		this.y2 = this.y + H;
		this.color = color;

		this.velx = 5;
		this.vely = 0.5;

		this.offScreen = false;
	}

	reset()
	{
		this.offScreen = false;
	}

	draw (g)
	{
		g.fillStyle = this.color;
		g.fillRect(this.x, this.y, W, H);
	}

	update ()
	{
		this.x += this.velx;
		this.y += this.vely;

		if (this.x+W < 0 || this.y+H < 0 || this.x > globals.width || this.y > globals.height)
		{
			this.x = 0.5*globals.width - 0.5*W;
			this.y = 0.5*globals.height - 0.5*H;
			this.offScreen = true;
		}

		this.x2 = this.x + W;
		this.y2 = this.y + H;
	}
}
