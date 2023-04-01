const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  plugins: [new MiniCssExtractPlugin()]
}

module.exports = nextConfig
