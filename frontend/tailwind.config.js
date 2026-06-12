/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        'background-click':'var(--background-click)',
        surface: 'var(--surface)',
        header: 'var(--header)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'primary-text': 'var(--primary-text)',
        'muted-text': 'var(--muted-text)',
        border: 'var(--border)'
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)'
      }
    },
  },
  plugins: [],
}