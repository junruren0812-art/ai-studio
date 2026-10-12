/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink: '#20332d', pomegranate: '#aa283b', coral: '#ef6a4b', canvas: '#f3f0ea' }, boxShadow: { panel: '0 16px 40px rgba(43,49,45,.08)' } } },
  plugins: [],
}