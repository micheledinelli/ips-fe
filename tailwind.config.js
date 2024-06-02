/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans Mono", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern-1": "url('/mesh-gradient-1.png')",
        "hero-pattern-2": "url('/mesh-gradient-2.png')",
        "hero-pattern-3": "url('/mesh-gradient-3.png')",
      },
      boxShadow: {
        "custom-dark":
          "0px 0px 0px 3px rgba(165, 165, 165, 0.04), 0px 9px 0px -5px rgba(0, 0, 0, 0.04), 18px 18px 18px -1.5px rgba(0, 0, 0, 0.08), 37px 37px 37px -3px rgba(0, 0, 0, 0.16), 75px 75px 75px -6px rgba(0, 0, 0, 0.24), 150px 150px 150px -12px rgba(0, 0, 0, 0.48)",
      },
    },
  },
  plugins: [],
};
