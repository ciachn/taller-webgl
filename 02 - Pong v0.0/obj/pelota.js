
import { globals } from '../graphics.js';
import { KeyState } from '../keyb.js';

export default class Pelota
{
	x;
	y;
	x2;
	y2;
	color;

	velx;
	vely;

	offScreen;
	size;

	constructor (color)
	{
		this.size = 24;
		this.x = 0.5*globals.width - 0.5*this.size;
		this.y = 0.5*globals.height - 0.5*this.size;
		this.x2 = this.x + this.size;
		this.y2 = this.y + this.size;
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
		g.fillRect(this.x, this.y, this.size, this.size);
	}

	update()
	{
		this.x += this.velx;
		this.y += this.vely;

		if (this.x+this.size < 0 || this.y+this.size < 0 || this.x > globals.width || this.y > globals.height)
		{
			this.x = 0.5*globals.width - 0.5*this.size;
			this.y = 0.5*globals.height - 0.5*this.size;
			this.offScreen = true;
		}

		this.x2 = this.x + this.size;
		this.y2 = this.y + this.size;
	}
}
