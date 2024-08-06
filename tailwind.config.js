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
      width: {

      },
      screens: {
        zero: "1440px",
        first: "850px",
      },
      colors: {
        'custom-gray': '#919494',
        'accent': '#FF6432'
      },
      fontSize: {
        sm: '0.75rem', //12px
        base: '1rem', //16px
        'lg': '1.125rem', //18px
        'xl': '1.25rem', //20px
        '2xl': '1.5rem', //24px
        '2.5xl': '1.75rem', //28px
        '5xl': '3.1875rem', //51px,
        'h1': [
          '3.875rem',
          {
            lineHeight: '4.65rem',
            fontWeight: '600'
          }
        ],
        'h2': [
          '3.188rem',
          {
            lineHeight: '3.825rem',
            fontWeight: '600'
          }
        ],
        'h3': [
          '2.75rem',
          {
            lineHeight: '3.3rem',
            fontWeight: '600'
          }
        ],
        'h4': [
          '1.875rem',
          {
            lineHeight: '2.25rem',
            fontWeight: '600'
          }
        ],
        'h5': [
          '1.5rem',
          {
            lineHeight: '1.8rem',
            fontWeight: '600'
          }
        ],
        'h6': [
          '1.25rem',
          {
            lineHeight: '1.708rem',
            fontWeight: '800'
          }
        ],
        'p1': [
          '1.25rem',
          {
            lineHeight: '2rem',
            fontWeight: '500'
          }
        ],
        'p2': [
          '1.125rem',
          {
            lineHeight: '1.625rem',
            fontWeight: '500'
          }
        ],
        'p3': [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '500'
          }
        ],
        'p4': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '500'
          }
        ],
        'p5': [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '500'
          }
        ],
        'btn': [
          '1.125rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '600'
          }
        ],
      }
    },
  },
  plugins: [],
};
