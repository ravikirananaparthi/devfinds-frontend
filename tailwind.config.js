/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ray: "#201658",
        yar: "#1D24CA",
        puk: "#98ABEE",
        sul: "#1B1A55",
        sol: "#461959",
        mod: "#FEFBF6",
        mg: "#9F5DE2", // Fuchsia-600
        pn: "#D946EF",
        guv:"#10121E",
        jagaur:"#070716", 
        ravi:"#0F2027",
        chakri:"#203A43",
        jaya:"#2C5364",
        a:"#03001e",
        b:"#7303c0",
        c:"#ec38bc",
        d:"#fdeff9",
        e:"#26D0CE",
      },
      zIndex: {
        za: "100",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui"),

    ],


};
