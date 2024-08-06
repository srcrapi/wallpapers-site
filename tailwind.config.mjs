/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: {
            opacity: 0,
            display: "none",
          },
          to: {
            opacity: 1,
            display: "inline-block",
          },
        },
        fadeOut: {
          from: {
            opacity: 1,
            display: "inline-block",
          },
          to: {
            opacity: 0,
            display: "none",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out both",
        fadeOut: "fadeOut 0.5s ease-in-out both",
      },
    },
  },
  plugins: [],
};
