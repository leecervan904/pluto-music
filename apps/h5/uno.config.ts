import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    [
      /^multi-ellipsis$/,
      () => ({
        'overflow': 'hidden',
        'white-space': 'no-wrap',
        'text-overflow': 'ellipsis',
      }),
    ],
    [
      /^multi-ellipsis-(\d+)$/,
      match => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-line-clamp': match[1],
        '-webkit-box-orient': 'vertical',
      }),
    ],
  ],
  shortcuts: {
    // shortcuts to multiple utilities
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-blue': 'text-white bg-blue-500 hover:bg-blue-700',
    // single utility alias
    'red': 'text-red-100',
  },
})
