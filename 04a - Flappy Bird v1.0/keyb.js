
export const KeyCodes =
{
	ENTER: 13,

	W: 87,
	A: 65,
	S: 83,
	D: 68,

	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

export const KeyState = { };

export function initKeyb()
{
	window.onkeydown = function (evt) {
		KeyState[evt.keyCode] = 1;
	};

	window.onkeyup = function (evt) {
		KeyState[evt.keyCode] = 0;
	};
}
