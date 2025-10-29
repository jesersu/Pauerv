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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        josefin: ['var(--font-josefin-sans)'],
        'josefin-slab': ['var(--font-josefin-slab)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
}

export default config
