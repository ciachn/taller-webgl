import { getIntersection } from './graphics.js';

export default class World
{
	sprites;
	walls;

	constructor()
	{
		this.sprites = [];
		this.walls = [];
	}

	add (sprite) {
		this.sprites.push(sprite);
	}

	addWall (sprite) {
		this.walls.push(sprite);
	}

	draw(g)
	{
		for (let s of this.walls)
			s.draw(g, this);

		for (let s of this.sprites)
			s.draw(g, this);
	}

	update()
	{
		for (let s of this.sprites)
			s.update(this);
	}

	checkWall (x, y, width, height)
	{
		let r1 = { x, y, width, height };

		for (let wall of this.walls)
		{
			let area = getIntersection (r1, wall);
			if (area == null) continue;

			let side;

			if (area.width > area.height)
			{
				let cy = area.y + 0.5*area.height;
				let dyU = Math.abs(cy - (wall.y));
				let dyD = Math.abs(cy - (wall.y + wall.height - 1));
				if (dyU < dyD)
					side = 'UP';
				else
					side = 'DOWN';
			}
			else
			{
				let cx = area.x + 0.5*area.width;
				let dxL = Math.abs(cx - (wall.x));
				let dxR = Math.abs(cx - (wall.x + wall.width - 1));
				if (dxL < dxR)
					side = 'LEFT';
				else
					side = 'RIGHT';
			}

			return [ wall, area, side ];
		}

		return [ null, null, null ];
	}
};
