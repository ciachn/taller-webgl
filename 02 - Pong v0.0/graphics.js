
/**
 * Variables globales.
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
		requestAnimationFrame(drawLoop);
	}
	
	drawLoop();
}
