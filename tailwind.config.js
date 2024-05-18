/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans Mono", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern-1": "url('/src/assets/mesh-gradient-1.png')",
        "hero-pattern-2": "url('/src/assets/mesh-gradient-2.png')",
        "hero-pattern-3": "url('/src/assets/mesh-gradient-3.png')",
      },
    },
  },
  plugins: [],
};
