
export const KeyCodes =
{
	ENTER: 13,
	SPACE: 32,

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
export const LastKeyState = { };

export function initKeyb()
{
	window.onkeydown = function (evt) {
		LastKeyState[evt.keyCode] = KeyState[evt.keyCode];
		KeyState[evt.keyCode] = 1;
	};

	window.onkeyup = function (evt) {
		LastKeyState[evt.keyCode] = KeyState[evt.keyCode];
		KeyState[evt.keyCode] = 0;
	};
}
