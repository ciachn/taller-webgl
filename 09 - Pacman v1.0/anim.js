
export default class Anim
{
	/**
	 * Imagen que se usará para la animación (spritesheet).
	 */
	img;

	/**
	 * Retraso entre frames (segundos).
	 */
	delay;

	/**
	 * Lista de secuencias.
	 */
	sequences;

	/**
	 * La secuencia de animación actual.
	 */
	sequence;

	/**
	 * La frame actual de la secuencia en progreso.
	 */
	frameIndex;

	/**
	 * El ancho de una frame de la animación.
	 */
	frameWidth;

	/**
	 * El alto de una frame de la animación.
	 */
	frameHeight;

	/**
	 * Tiempo de dibujo de la última frame.
	 */
	lastDrawTime;

	/**
	 * Indica si la animación esta en pausa.
	 */
	paused;

	/**
	 * Indica si se repite la secuencia en progreso.
	 */
	loopEnabled;

	/**
	 * Indica si la animación ya terminó (secuencia actual). Sólo funciona si `loopEnabled` es false.
	 */
	finished;

	/**
	 * Construye un objeto de animación con la spritesheet dada.
	 * @param {Image} spritesheet
	 */
	constructor (spritesheet, frameWidth, defaultFps=24)
	{
		this.img = spritesheet;
		this.frameWidth = frameWidth;
		this.frameHeight = this.img.height;
		this.lastDrawTime = 0;

		this.paused = false;
		this.finished = false;

		this.sequences = new Map();
		this.sequence = null;
		this.setFps(defaultFps);
	}

	/**
	 * Agrega un descriptor de secuencia a la animación.
	 * @param {string} name - Nombre de la secuencia.
	 * @param {Array<number>} frames
	 * @returns {Anim}
	 */
	addSequence (name, frames)
	{
		this.sequences.set(name, frames);
		return this;
	}

	/**
	 * Cambia el retraso interno entre frames.
	 * @param {number} value - Numero de frames por segundo.
	 * @returns {Anim}
	 */
	setFps (value)
	{
		this.delay = 1.0 / value;
		return this;
	}

	/**
	 * Inicia la reproducción de una secuencia.
	 * @param {string} name - Nombre de la secuencia.
	 * @param {boolean} loopEnabled - Indica si se desea repetir la animación.
	 * @returns {Anim}
	 */
	play (name, loopEnabled=true)
	{
		this.loopEnabled = loopEnabled;
		this.finished = false;

		let seq = this.sequences.get(name);
		if (seq === this.sequence)
			return this;

		this.sequence = seq;
		this.frameIndex = 0;
		return this;
	}

	/**
	 * Cambia el estado de reproducción (i.e. pausa / quita la pausa de la animación).
	 * @param {boolean} value 
	 * @returns {Anim}
	 */
	pause (value)
	{
		this.paused = value;
		return this;
	}

	/**
	 * Dibujar una frame de animación.
	 * @param {CanvasRenderingContext2D} g 
	 * @param {number} x 
	 * @param {number} y 
	 */
	draw (g, x, y)
	{
		g.drawImage(this.img,
				this.sequence[this.frameIndex]*this.frameWidth, 0, this.frameWidth, this.frameHeight,
				x, y, this.frameWidth, this.frameHeight);

		let now = performance.now();
		let delta = (now - this.lastDrawTime) / 1000.0;

		if (delta >= this.delay)
		{
			if (this.paused == false) {
				this.frameIndex++;
				if (this.frameIndex >= this.sequence.length)
				{
					if (this.loopEnabled) {
						this.frameIndex = 0;
					} else {
						this.frameIndex = this.sequence.length-1;
						this.finished = true;
						this.paused = true;
					}
				}
			}

			this.lastDrawTime = now;
		}
	}
};
