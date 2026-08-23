/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iqoo: {
          amber: '#FF6B00',
          orange: '#FF5500',
          dark: '#07080E',
          accent: '#FF7A00',
          blue: '#3B82F6',
          glow: 'rgba(255, 107, 0, 0.15)',
        },
        charcoal: {
          950: '#07080E',
          900: '#0C1019',
          850: '#0F1420',
          800: '#141A28',
          750: '#192132',
          700: '#1E283C',
          600: '#2D3B54',
        },
        surface: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#0C1019',
          950: '#07080E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'linear': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 12px 30px -10px rgba(0, 0, 0, 0.5)',
        'linear-amber': '0 0 0 1px rgba(255, 107, 0, 0.3), 0 12px 30px -10px rgba(255, 107, 0, 0.2)',
        'glow-soft': '0 0 40px -10px rgba(255, 107, 0, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
