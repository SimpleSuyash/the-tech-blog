/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js}"],
  // content: ["./src/**/*.{handlebars,js}"],
  content: ["./src/**/*.js", "./**/*.handlebars"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill' : 'repeat(auto-fit, minmax(36em, 1fr))'
      },
      fontFamily: {
        heading: ["Playfair Display"], 
        content: ["Barlow"]
        // heading: ["Kalnia"], 
        // content: ["Nunito Sans"]
      }
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography")
  ],
}

