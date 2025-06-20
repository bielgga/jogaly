import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'friv-purple': '#5B4FCF',
        'friv-blue': '#4F8CF7',
        'friv-green': '#4FD1C7',
        'friv-yellow': '#FFD93D',
        'friv-pink': '#FF6B9D',
        'friv-orange': '#FF8C42',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'friv-gradient': 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 25%, #60a5fa 50%, #07257b 75%, #1e40af 100%)',
      },
    },
  },
  plugins: [],
}
export default config 