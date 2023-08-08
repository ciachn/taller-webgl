
import { globals, initCanvas, startRender } from './graphics.js';
import { initKeyb } from './keyb.js';
import { init as loadResources, r } from './res.js';

import Pacman from './sprites/pacman.js';
import Wall from './sprites/wall.js';
import World from './world.js';

let w;

function render (g) {
	draw(g);
	update();
}

function draw (g) {
	w.draw(g);
}

function update() {
	w.update();
}

function restart()
{
	w = new World();
	w.add(new Pacman(10, 10));
	
	w.addWall(new Wall(40, 40, r.wall));
	w.addWall(new Wall(140, 40, r.wall));
	w.addWall(new Wall(240, 40, r.wall));
	w.addWall(new Wall(40, 140, r.wall));
	w.addWall(new Wall(40, 240, r.wall));
}

async function main()
{
	initCanvas('canvas', 'black');
	globals.antialias = false;
	globals.scale = 4.0;

	initKeyb();

	await loadResources();
	restart();

	startRender(render);
}

main();
