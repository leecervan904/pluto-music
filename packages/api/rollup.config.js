import ts from 'rollup-plugin-ts'

export default {
  input: './index.ts',
  output: {
    file: 'bundle.js',
    format: 'es',
  },
  plugins: [
    ts(),
  ],
}
