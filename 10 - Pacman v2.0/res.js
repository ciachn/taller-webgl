
import { loadImage, loadAudio } from './resources.js';

export const r =
{
	pacmanMove: null,
	pacmanDead: null,
	wall: null,
};

export async function init ()
{
	r.pacmanMove = await loadImage('res/pacman-move.png');
	r.pacmanDead = await loadImage('res/pacman-dead.png');
	r.wall = await loadImage('res/wall.png');
}
