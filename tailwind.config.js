/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
      },
      backgroundImage: {
        'dot-pattern': "url('data:image/svg+xml, <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\"><pattern id=\"pattern-circles\" x=\"0\" y=\"0\" width=\"25\" height=\"25\" patternUnits=\"userSpaceOnUse\" patternContentUnits=\"userSpaceOnUse\"><circle id=\"pattern-circle\" cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23cbd5e1\"></circle></pattern><rect id=\"rect\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(%23pattern-circles)\"></rect></svg>')",
      },
    },
  },
  plugins: [],
}
