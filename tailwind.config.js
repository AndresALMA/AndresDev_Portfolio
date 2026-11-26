/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        muted: '#475569',
        accent: '#2563eb',
      },
      keyframes: {
        'logo-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'logo-scroll': 'logo-scroll 60s linear infinite',
      },
    },
  },
  plugins: [],
}

