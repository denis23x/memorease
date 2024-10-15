/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'selector',
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
      backgroundImage: {
        'pattern-2-3-neutral': "url('/public/assets/images/pattern-2-3-neutral.png')",
        'pattern-2-3-red': "url('/public/assets/images/pattern-2-3-red.png')",
        'pattern-2-3-red-2': "url('/public/assets/images/pattern-2-3-red-2.png')",
        'pattern-2-3-slate': "url('/public/assets/images/pattern-2-3-slate.png')",
        'pattern-2-3-teal': "url('/public/assets/images/pattern-2-3-teal.png')",
        'pattern-2-3-teal-2': "url('/public/assets/images/pattern-2-3-teal-2.png')",
        'pattern-12-9-neutral': "url('/public/assets/images/pattern-12-9-neutral.png')",
        'pattern-12-9-slate': "url('/public/assets/images/pattern-12-9-slate.png')",
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto'
      },
      boxShadow: {
        'stack-neutral': '0 8px 0 -5px #FAFAFA, 0 8px 0 -4px #E5E5E5, 0 15px 0 -8px #FAFAFA, 0 15px 0 -7px #E5E5E5',
        'stack-sky': '0 8px 0 -5px #0f172a, 0 8px 0 -4px #334155, 0 15px 0 -8px #0f172a, 0 15px 0 -7px #334155;',
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
