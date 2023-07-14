const Easing = {
	Linear: {
		IN: function (t) {
			return t;
		},
		OUT: function (t) {
			return t;
		},
		IN_OUT: function (t) {
			return t;
		}
	},
	Back: {
		k: 1.70158,
		IN: function (t, k=null) {
			if (k === null) k = Easing.Back.k;
			return t*t*((k+1)*t - k);
		},
		OUT: function (t, k=null) {
			return 1 - Easing.Back.IN(1 - t, k);
		},
		IN_OUT: function (t, k=null) {
			if (t < 0.5)
				return Easing.Back.IN(t*2, k)/2;
			else
				return Easing.Back.OUT((t-0.5)*2, k)/2 + 0.5;
		}
	},
	Bounce: {
		getConst: function (t) {
			if (t < 1.0/2.75)
				return 7.5625 * t * t;
			else if (t < 2.0/2.75)
				return 7.5625 * (t -= 1.5/2.75)*t + 0.75;
			else if (t < 2.5/2.75)
				return 7.5625 * (t -= 2.250/2.75) * t + 0.9375;
			return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
		},
		IN: function (t) {
			return 1 - Easing.Bounce.getConst(1-t);
		},
		OUT: function (t) {
			return Easing.Bounce.getConst(t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return (1 - Easing.Bounce.getConst(1-2*t))/2;
			else
				return (Easing.Bounce.getConst((t-0.5)*2)/2)+0.5;
		}
	},
	Circ: {
		IN: function (t) {
			return 1 - Math.sqrt(1 - t*t);
		},
		OUT: function (t) {
			return 1 - Easing.Circ.IN(1 - t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return Easing.Circ.IN(t*2)/2;
			else
				return Easing.Circ.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	Cubic: {
		IN: function (t) {
			return t*t*t;
		},
		OUT: function (t) {
			return 1 - Easing.Cubic.IN(1 - t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return Easing.Cubic.IN(t*2)/2;
			else
				return Easing.Cubic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	Expo: {
		IN: function (t) {
			return Math.pow(2, 12*(t-1));
		},
		OUT: function (t) {
			return -Math.pow(2, -12*t) + 1;
		},
		IN_OUT: function (t) {
			if ((t *= 2) < 1)
				return Math.pow (2, 12 * (t - 1)) / 2;
			else
				return (-Math.pow (2, -12 * (t - 1)) + 2) / 2;
		}
	},
	Power: {
		IN: function (t, p=12) {
			return Math.pow(t, p);
		},
		OUT: function (t, p=12) {
			return 1 - Easing.Power.IN(1 - t, p);
		},
		IN_OUT: function (t, p=12) {
			if (t < 0.5)
				return Easing.Power.IN(t*2, p)/2;
			else
				return Easing.Power.OUT((t-0.5)*2, p)/2 + 0.5;
		}
	},
	Quad: {
		IN: function (t) {
			return t*t;
		},
		OUT: function (t) {
			return 1 - Easing.Quad.IN(1 - t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return Easing.Quad.IN(t*2)/2;
			else
				return Easing.Quad.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	Quartic: {
		IN: function (t) {
			return t*t*t*t;
		},
		OUT: function (t) {
			return 1 - Easing.Quartic.IN(1 - t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return Easing.Quartic.IN(t*2)/2;
			else
				return Easing.Quartic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	Quintic: {
		IN: function (t) {
			return t*t*t*t*t;
		},
		OUT: function (t) {
			return 1 - Easing.Quintic.IN(1 - t);
		},
		IN_OUT: function (t) {
			if (t < 0.5)
				return Easing.Quintic.IN(t*2)/2;
			else
				return Easing.Quintic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	Sine: {
		IN: function (t) {
			return 1 - Math.sin (1.5708 * (1 - t));
		},
		OUT: function (t) {
			return Math.sin (1.5708 * t);
		},
		IN_OUT: function (t) {
			return (Math.cos (3.1416*t) - 1) / -2;
		}
	},
	Step: {
		IN: function (t) {
			return t != 1.0 ? 0 : 1.0;
		},
		OUT: function (t) {
			return t != 1.0 ? 0 : 1.0;
		},
		IN_OUT: function (t) {
			return t != 1.0 ? 0 : 1.0;
		}
	}
};

export default Easing;