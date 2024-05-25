const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontSize: {
			xs: '1.1rem',
			sm: '1.21rem',
			tiny: '1.27rem',
			base: '1.46rem',
			lg: '1.64rem',
			xl: '1.825rem',
			'2xl': '2.2rem',
			'3xl': '2.7rem',
			'4xl': '3.25rem',
			'5xl': '4.3rem'
		},
		extend: {
			colors: {
				primary: '#9733ee',
				black: '#222'
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out'
			},
			transitionDuration: {
				DEFAULT: '200ms'
			}
		}
	},
	plugins: []
}
