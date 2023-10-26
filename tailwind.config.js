/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    extend: {
      backgroundColor: {
        'eeff5db': '#EEF5DB',
      },
    },
    extend:{
      borderColor:{
        '7a9e9f':'#7A9E9F'
      }
    }
    
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
