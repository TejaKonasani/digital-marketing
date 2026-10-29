/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eef6f5',
          100: '#d6ebe9',
          200: '#aed7d4',
          300: '#7dbdb9',
          400: '#4b9e9b',
          500: '#2f8280',
          600: '#256a69',
          700: '#215555',
          800: '#1f4646',
          900: '#1d3b3c',
          950: '#0e2324'
        }
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(13 44 44 / 0.05), 0 1px 3px 0 rgb(13 44 44 / 0.07)',
        pop: '0 10px 30px -10px rgb(13 44 44 / 0.25)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'slide-in': 'slide-in 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}