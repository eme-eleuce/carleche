/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-orange': '#ea8415',
        'custom-brown': '#831d15',
      },
      keyframes: {
        heartbeat: {
          '0%, 28%, 56%, 100%': { transform: 'scale(1)' },
          '14%, 42%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
