import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: { DEFAULT: '#6B1532', dark: '#4a0f22', mid: '#8B2040' },
        cream: { DEFAULT: '#F8F2E8', d: '#EDE3D4', dd: '#D4BFA3' },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
