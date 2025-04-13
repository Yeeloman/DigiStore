// tailwind.config.js
import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#3b82f6',
				secondary: '#10b981',
				accent: '#f59e0b',
			}
		},
	},
	plugins: [],
} satisfies Config;
