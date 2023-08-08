
import { KeyCodes, KeyState } from '../keyb.js';
import { r } from '../res.js';
import Anim from '../anim.js';

export default class Wall
{
	img;
	x;
	y;
	width;
	height;

	constructor (x, y, img)
	{
		this.x = x;
		this.y = y;
		this.img = img;
		this.width = img.width;
		this.height = img.height;
	}

	draw(g)
	{
		g.drawImage(this.img, this.x, this.y);
	}

	update()
	{
	}
};
