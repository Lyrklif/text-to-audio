/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: ['flowbite/plugin']
}
