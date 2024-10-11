/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'serif'],
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto'
      },
      boxShadow: {
        'deck': '0 8px 0 -5px #FAFAFA, 0 8px 0 -4px #E5E5E5, 0 15px 0 -8px #FAFAFA, 0 15px 0 -7px #E5E5E5',
      },
      screens: {
        'mouse': {
          raw: '(hover: hover) and (pointer: fine)',
        },
        'touch': {
          raw: '(hover: none) and (pointer: coarse)',
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
