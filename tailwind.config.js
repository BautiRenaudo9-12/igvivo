/** @type {import('tailwindcss').Config} */ 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "mainBlue":"#3D37F1",
      },
      fontFamily: {
        main: ['Noto Sans Khojki', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

