const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
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
      'dark-tremor': {
        brand: {
          faint: '#0B1229',
          muted: colors.blue[950],
          subtle: colors.blue[800],
          DEFAULT: colors.blue[500],
          emphasis: colors.blue[400],
          inverted: colors.blue[950],
        },
        background: {
          muted: '#131A2B',
          subtle: colors.gray[800],
          DEFAULT: colors.gray[900],
          emphasis: colors.gray[300],
        },
        border: {
          DEFAULT: colors.gray[800],
        },
        ring: {
          DEFAULT: colors.gray[800],
        },
        content: {
          subtle: colors.gray[600],
          DEFAULT: colors.gray[500],
          emphasis: colors.gray[200],
          strong: colors.gray[50],
          inverted: colors.gray[950],
        },
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [
    require("daisyui"),
  ],
};
