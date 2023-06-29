
/**
 * Contexto 2D global.
 */
export const globals = 
{
	canvas: null,
	ctx: null,

	width: null,
	height: null
};


/**
 * Convierte grados a radianes.
 * @param {number} angle 
 * @returns {number}
 */
export function rad (angle) {
	return Math.PI*(angle/180);
}


/**
 * Initializa el estado global.
 * @param {string} idCanvas - ID del canvas a utilizar.
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
 * Limpiar la pantalla.
 */
export function clearScreen()
{
	// Truco para limpiar el canvas.
	globals.canvas.width = globals.canvas.width;
}


/**
 * Iniciar el proceso de renderizado.
 * @param {function} drawFunction
 */
export function startRender (drawFunction)
{
	function drawLoop() {
		clearScreen();
		drawFunction(globals.ctx);
		requestAnimationFrame(drawLoop);
	}
	
	drawLoop();
}
