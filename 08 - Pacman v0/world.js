
export default class World
{
	sprites;

	constructor()
	{
		this.sprites = [];
	}

	add (sprite) {
		this.sprites.push(sprite);
	}

	draw(g) {
		for (let s of this.sprites)
			s.draw(g);
	}

	update() {
		for (let s of this.sprites)
			s.update();
	}
};
