import type { Config } from "tailwindcss";

const config: Config = {
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
        "nav-bg": "#E6EDFE",
        "nav-active": "#062983",
        "nav-text": "#5482F7",
        "main-black": "#262626",
        "main-grey": "#666666",
        "secondary-grey": "#808080",
        "lighter-grey": "#B2B2B2",
        "dashboard-bg": "#F8F8FA",
        "beneficiary-green": "#047E02",
        "beneficiary-blue": "#9DB8FB",
        "beneficiary-orange": "#F8AB6D",
        "main-green": "#10C00C",
        "bg-input": "#919EAB14",
        
      },
      boxShadow: {
        'btn': "2px 4px 9px 2px #8B94C159, -2px -4px 7px 2px #8B94C159"
      }
    },
  },
  plugins: [],
};
export default config;
