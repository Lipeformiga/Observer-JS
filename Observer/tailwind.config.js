/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

      maxWidth:{
        '1/4' : '25%'
      },
      backgroundColor:{
        'background1' : '#FFE4E4',
        'background2' : '#E6FFDE'
      },
      textColor:{
        'red-custom' : '#CD0000',
        'green-custom' : '#00CD00'
      },
      boxShadow:{
        'customShadow' : '7px 7px 10px 0px rgba(0, 0, 0, 0.25)'
      },
    },
  },
  plugins: [],
}