/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'border-l-4',
    'border-gray-500',
    'pl-2',
    'bg-gray-100',
  ],
  theme: {
    extend: { 
      fontFamily: { 
        body: ["DM Sans"],
        rome: ["Playfair Display"]
      }
    }
  },
  plugins: [],
}
