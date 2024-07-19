/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],

  theme: {
    extend: {
      fontSize: {
        'xl': '24px',
        'lg': '20px',
        'md': '18px',
        'base': '16px',
        'sm': '14px',
        'xs': '12px',
      },
      width:{

      },
      screens: {
        zero: "1440px",
        first: "850px",
      },
    },
  },
  plugins: [],
};
