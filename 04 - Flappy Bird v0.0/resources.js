
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
