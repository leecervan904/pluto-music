import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsla(var(--hue, 217), 78%, 51%)', //class="bg-brand-primary"
      },
    },
  },
  rules: [
    [
      /^ellipsis$/,
      () => ({
        overflow: 'hidden',
        'white-space': 'no-wrap',
        'text-overflow': 'ellipsis',
      }),
    ],
    [
      /^multi-ellipsis-(\d+)$/,
      (match) => ({
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        '-webkit-line-clamp': match[1],
        '-webkit-box-orient': 'vertical',
      }),
    ],
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      },
    ],
    [
      /^table-striped$/,
      () => ({
        'background-color': '#eee',
      }),
    ],
  ],
  shortcuts: {
    // shortcuts to multiple utilities
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
    // single utility alias
    red: 'text-red-100',
  },
})
