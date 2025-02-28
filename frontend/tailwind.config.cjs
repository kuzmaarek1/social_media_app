/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        black: '#242d49',
        yellow: '#f5c32c',
        orange: '#fca61f',
        black: '#242d49',
        gray: 'rgba(36, 45, 73, 0.65)',
        profileShadow: '0px 4px 17px 2px rgba(0, 0, 0, 0.25)',
        hrColor: '#cfcdcd',
        cardColor: 'rgba(255, 255, 255, 0.64)',
        inputColor: 'rgba(40, 52, 62, 0.07)',
        photo: '#4CB256',
        video: '#4A4EB7',
        location: '#EF5757',
        shedule: '#E1AE4A',
      },
    },
  },
  plugins: [],
};
