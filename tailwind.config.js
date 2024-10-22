/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green:"var(--green)",
        lightgray:"var(--light-gray)"
      },
      fontFamily:{
        FavoritBookC:["FavoritBookC", "sans-serif"], 
        TestSohneKraftig:["TestSohne-Kraftig", "sans-serif"],
        TestSohneMonoBuch:["TestSohneMono-Buch", "sans-serif"],
        Tiposka:["Tiposka", "sans-serif"]
      },
      
    },
  },
  plugins: [
    require('daisyui')
  ]
};
