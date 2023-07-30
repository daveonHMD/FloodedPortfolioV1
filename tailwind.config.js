/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  options: {
    safelist: ['h-30', 'h-40'],
  },
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        'text': '#E6E8EA',
        'background': '#000000',
        'primary': '#433D37',
        'secondary': '#191C1F',
        'accent': '#8F8176',
      },
      opacity: {
        '67': '.67',
        '61': '.61',
      },
      height: {
        '30': '7.5rem', // Customize the height value here
        '40': '10rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("rippleui")
  ],
}