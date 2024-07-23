/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    width: {
      navbarWidth:"100vw",
    },
    extend: {
      colors:{
        headerBg: "rgb(255, 255, 255)",
        footerBg: "rgb(255, 255, 255)",
        bodyBg: "#e3e3e3",
        inputBg: "#f2f2f2",
        inputBgFocus: "#dbdbdb",
        textColor: "#000",
        lightTextColor: "#545454",
        lighttexttitle: "#353535",
        lightgreen: "#00ad1d",
        darkgreen: "#016034",
        orange: "#d97919",
        lightorange: "#ffaf60",
        darkorange: "#c26100",
        xdarkorange: "rgb(157, 42, 1)",
        lightred: "rgb(236, 56, 56)",
        white: "#fff",
        lightwhitetext: "#eaeaea",
        lightblack: "rgb(23, 23, 23)",
        lightblue: "#0463ac",
        darkblue: "#070062",
        borderColor: "rgba(40, 44, 63, 0.45)",
      },
      fontFamily: {
        cardFont: ["PT Sans", "Calibri", "sans-serif"],
      },
      boxShadow: {
        navbarShadow: "-2px 7px 5px -6px  rgba(0,0,0,0.61)",
        cardshadow: "-1px 5px 10px 5px rgba(112, 112, 112, 0.2)",
        searchbarShadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.08)",
        btnshadow: "1px 2px 4px 0 rgba(0, 0, 0, 0.08);",
      },
    },
  },
  plugins: [],
}