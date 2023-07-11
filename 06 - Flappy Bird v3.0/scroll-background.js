
import { globals } from './graphics.js';

export default class ScrollBackground
{
	image;
	map;
	scrollX;

	// Inicializar el mapa del fondo.
	constructor (image)
	{
		this.map = [];

		let cols = 1 + Math.ceil(globals.width / image.width);
		let lines = Math.ceil(globals.height / image.height);

		for (let j = 0; j < lines; j++)
		{
			let bgLine = { tiles: [], maxX: 0 };
			this.map.push(bgLine);

			for (let i = 0; i < cols; i++)
			{
				let tile = { img: image, x: i*image.width, y: j*image.height };
				bgLine.tiles.push(tile);
			}

			bgLine.maxX = bgLine.tiles.at(-1).x + bgLine.tiles.at(-1).img.width;
		}
	}

	// Dibujar el fondo.
	draw (g)
	{
		for (let line of this.map)
		for (let tile of line.tiles) {
			g.drawImage(tile.img, tile.x, tile.y);
		}
	}

	// Hacer scroll del fondo.
	scroll (speed)
	{
		this.scrollX += speed;

		for (let line of this.map)
		{
			line.maxX += -speed;

			for (let tile of line.tiles)
			{
				tile.x += -speed;

				if (tile.x+tile.img.width < 0)
				{
					tile.x = line.maxX;
					line.maxX += tile.img.width;
				}
			}
		}
	}
};
