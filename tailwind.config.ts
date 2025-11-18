import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Color Palette
        navy: {
          deep: '#0A1628',
          DEFAULT: '#0A1628',
        },
        ocean: {
          deep: '#0A1628',
          blue: '#1E4A6F',
          DEFAULT: '#1E4A6F',
        },
        teal: {
          refugia: '#2C7A7B',
          DEFAULT: '#2C7A7B',
        },
        coral: {
          living: '#FF6B6B',
          DEFAULT: '#FF6B6B',
        },
        sand: {
          warm: '#F7F4F0',
          DEFAULT: '#F7F4F0',
        },
        // Legacy support (map to new colors)
        turquoise: {
          light: '#2C7A7B',
          DEFAULT: '#2C7A7B',
          reef: '#2C7A7B',
        },
        'text-dark': '#1A1A1A',
        'bg-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Instrument Serif', 'Newsreader', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-bottom': 'slideInBottom 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'premium': '0 4px 12px rgba(44, 122, 123, 0.3)',
        'premium-hover': '0 6px 20px rgba(44, 122, 123, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
