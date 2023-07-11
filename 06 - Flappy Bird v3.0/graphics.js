
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
