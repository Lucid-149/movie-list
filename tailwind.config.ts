
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3DD68C",
        error: "#F06A6A",
        background: {
          DEFAULT: "#093545",
        },
        input: "#224957",
        card: "#092C39",
      },
      container: {
        center: true,
        padding: "120px",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      spacing: {
        "2": "2px",
        "4": "4px",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "40": "40px",
        "48": "48px",
        "64": "64px",
        "80": "80px",
        "120": "120px",
        "160": "160px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animated"),
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          maxWidth: "1440px", // Max-width as specified
        },
      });
    },
  ],
};
export default config;
