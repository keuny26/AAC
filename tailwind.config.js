/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        emergency: '#DC2626',
        success: '#22C55E',
        warning: '#F59E0B',
        listener: {
          bg: '#000000',
          text: '#FFDD00',
        }
      },
    },
  },
  plugins: [],
}