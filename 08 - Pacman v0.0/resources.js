
/**
 * Carga una imagen de la URL dada.
 * @param {string} url
 * @returns {Promise<Image>}
 */
export function loadImage (url)
{
	return new Promise((resolve, reject) =>
	{
		let img = new Image();
		img.src = url;

		img.onload = function() {
			resolve(img);
		};

		img.onerror = function() {
			reject('No se pudo cargar la imagen: ' + url);
		};
	});
}

/**
 * Carga un archivo de audio de la URL dada.
 * @param {string} url
 * @returns {Promise<Audio>}
 */
export function loadAudio (url)
{
	return new Promise((resolve, reject) =>
	{
		let audio = new Audio();
		audio.src = url;

		audio.oncanplaythrough = function() {
			resolve(audio);
		};

		audio.onerror = function() {
			reject('No se pudo cargar el audio: ' + url);
		};
	});
}
