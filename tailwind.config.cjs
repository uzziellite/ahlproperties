/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,js,jsx,svelte}"],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  theme:{
    fontFamily:{
      'sans':['Poppins','system-ui'],
      'serif':['Source Sans Pro','system-ui']
    }
  }
}
