
import { globals, rad } from '../graphics.js';
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
		this.size = 30;

		this.x = 0.5*globals.width - 0.5*this.size;
		this.y = 0.5*globals.height - 0.5*this.size;
		this.x2 = this.x + this.size;
		this.y2 = this.y + this.size;
		this.color = color;

		this.velx = -5;
		this.vely = 0.5;

		this.offScreen = 0;
	}

	reset()
	{
		this.offScreen = 0;
	}

	draw (g)
	{
		g.fillStyle = this.color;
		g.beginPath();
		g.arc(this.x + 0.5*this.size, this.y + 0.5*this.size, 0.5*this.size, 0, rad(360));
		g.fill();
	}

	update()
	{
		this.x += this.velx;
		this.y += this.vely;
		this.x2 = this.x + this.size;
		this.y2 = this.y + this.size;

		// Se salga de la pantalla horizontalmente.
		if (this.x < 0 || this.x2 > globals.width-1)
		{
			if (this.x < 0)
				this.offScreen = -1;
			else
				this.offScreen = +1;

			this.x = 0.5*globals.width - 0.5*this.size;
			this.y = 0.5*globals.height - 0.5*this.size;
		}

		// Se sale por la parte de arriba de la pantalla.
		if (this.y < 0)
		{
			this.y = 0;
			this.vely *= -1;
		}

		// Se sale por la parte de abajo de la pantalla.
		if (this.y2 > globals.height-1)
		{
			this.y = globals.height-1 - this.size;
			this.vely *= -1;
		}

		this.x2 = this.x + this.size;
		this.y2 = this.y + this.size;
	}
}
