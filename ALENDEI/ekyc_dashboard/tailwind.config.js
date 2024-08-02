/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '768px', // Add custom breakpoint for extra small screens
      },
    },
  },
  plugins: [],
};
