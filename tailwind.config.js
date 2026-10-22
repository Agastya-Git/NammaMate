/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#E8EFED',
          100: '#C5D6D1',
          200: '#9AB8B0',
          300: '#6E978C',
          400: '#45766B',
          500: '#2A5A4F',
          600: '#1C4A3F',
          700: '#15382F',
          800: '#102B28',
          900: '#0A1D1B',
        },
        lime: {
          50: '#FBFEE8',
          100: '#F4FCC4',
          200: '#EBF98A',
          300: '#D5F36A',
          400: '#BCE643',
          500: '#9FCB1E',
          600: '#7BA014',
          700: '#5A760F',
          800: '#3D510A',
        },
        warm: {
          50: '#FDFDF8',
          100: '#F8F8F3',
          200: '#F0F0E8',
          300: '#E5E5DA',
          400: '#D4D4C6',
          500: '#B8B8A8',
          600: '#9A9A88',
          700: '#7C7C6E',
          800: '#5E5E54',
          900: '#40403A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(16, 43, 40, 0.06)',
        'card': '0 4px 24px rgba(16, 43, 40, 0.08)',
        'lift': '0 12px 40px rgba(16, 43, 40, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { 'from': { opacity: '0' }, 'to': { opacity: '1' } },
        fadeInUp: { 'from': { opacity: '0', transform: 'translateY(16px)' }, 'to': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { 'from': { opacity: '0', transform: 'translateX(20px)' }, 'to': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { 'from': { opacity: '0', transform: 'scale(0.95)' }, 'to': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
