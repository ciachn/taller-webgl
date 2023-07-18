
/**
 * Variables globales.
 */
export const globals = 
{
	canvas: null,
	ctx: null,

	width: null, // ancho
	height: null // alto
};


/**
 * Convierte grados a radianes.
 * @param {number} angle 
 * @returns {number}
 */
export function rad (angle) {
	return Math.PI*(angle/180);
}

export function rand (a0, a1)
{
	return Math.ceil(Math.random()*(a1 - a0)) + a0;
}

export function drawImageRotated (img, x, y, angle)
{
	const g = globals.ctx;
	g.save();
	g.translate(x + 0.5*img.width, y + 0.5*img.height);
	g.rotate(rad(angle));
	g.drawImage(img, -0.5*img.width, -0.5*img.height);
	g.restore();
}


/**
 * Inicializa el sistema de gráficos en el canvas dado su ID.
 * @param {string} idCanvas - ID del canvas a utilizar.
 * @param {string} backgroundColor - Color de fondo (opcional).
 */
export function initCanvas (idCanvas, backgroundColor='#fff')
{
	globals.canvas = document.getElementById(idCanvas);
	globals.ctx = globals.canvas.getContext('2d');
	globals.canvas.style.backgroundColor = backgroundColor;

	globals.width = globals.canvas.width = window.innerWidth;
	globals.height = globals.canvas.height = window.innerHeight;
}


/**
 * Limpia la pantalla.
 */
export function clearScreen()
{
	// Truco estandar para limpiar un canvas. Resetear su propiedad de "ancho" o "alto".
	globals.canvas.width = globals.canvas.width;
}


/**
 * Inicia el proceso de renderizado. La función "drawFunction" se ejecutará una vez cada frame.
 * @param {function} drawFunction
 */
export function startRender (drawFunction)
{
	function drawLoop() {
		clearScreen();
		drawFunction(globals.ctx);

		// Solicita una frame al navegador, usualmente a 60 FPS (16ms).
		requestAnimationFrame(drawLoop);

		// Ralentizar velocidad y ponerlo en modo camara lenta.
		//setTimeout(drawLoop, 30);
	}
	
	drawLoop();
}

/**
 * Retorna `true` si existe una colisión (intersección) entre los rectangulos datos.
 * @param {Rect} rect0
 * @param {Rect} rect1
 * @returns {boolean}
 */
export function intersection (rect0, rect1)
{
	let Ax1 = rect0.x;
	let Ay1 = rect0.y;
	let Ax2 = rect0.x + rect0.width-1;
	let Ay2 = rect0.y + rect0.height-1;

	let Bx1 = rect1.x;
	let By1 = rect1.y;
	let Bx2 = rect1.x + rect1.width-1;
	let By2 = rect1.y + rect1.height-1;

	let x1 = Math.max(Ax1, Bx1);
	let x2 = Math.min(Ax2, Bx2);

	let y1 = Math.max(Ay1, By1);
	let y2 = Math.min(Ay2, By2);

	let dx = x2 - x1;
	let dy = y2 - y1;

	if (dx >= 0 && dy >= 0)
		return true;
	else
		return false;
}
