/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: 'var(--bg--primary)',
        darkText: 'var(--text--primary)',
        darkBorder: 'var(--border--primary)',
        darkBgSecondary: 'var(--bg--secondary)',
        darkTextSecondary: 'var(--text--secondary)',
        darkBorderSecondary: 'var(--border--secondary)',
      },
    },
  },
  plugins: [],
}