/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'card-bg': 'var(--card-bg)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        category1: 'var(--category1)',
        category2: 'var(--category2)',
        category3: 'var(--category3)',
        category4: 'var(--category4)',
        category5: 'var(--category5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  safelist: ['bg-primary/20', 'bg-opacity-20'],
}
