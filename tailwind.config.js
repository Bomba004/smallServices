
/**
 * @file : ./tailwind.config.js
 * @version : 1.0.0
 * @lastUpdatedAt : [{ "date": "31/10/2025", "by": ["BomBa"], "comment": "ملف لتكوين Tailwind CSS مع تخصيصات للخطوط والسمات الداكنة والإضافات" }]
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 ربط ألوان Tailwind بالمتغيرات الخاصة بك في :root
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        success: "hsl(var(--success))",
        danger: "hsl(var(--danger))",
        warning: "hsl(var(--warning))",
        info: "hsl(var(--info))",
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
        gray: "hsl(var(--gray))",
        white: "hsl(var(--white))",
        black: "hsl(var(--black))",
      },
    },
  },
  plugins: [],
}
