/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050509',
          900: '#0a0a12',
          850: '#0d0d18',
          800: '#12121f',
          700: '#1a1a2e',
        },
        violet: { glow: '#8b5cf6' },
        cyan: { glow: '#22d3ee' },
        magenta: { glow: '#ec4899' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139, 92, 246, 0.5)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-pink': '0 0 40px -10px rgba(236, 72, 153, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
}

