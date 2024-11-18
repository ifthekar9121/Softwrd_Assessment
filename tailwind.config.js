import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FFFFFF',
          600: '#1C64F2',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        green: {
          600: '#31C48D',
        }
      }
    }
  },
  plugins: [flowbitePlugin]
} as Config;