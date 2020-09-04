const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/damedane.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'damedane.min.js',
    library: 'Damedane',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!index.html']
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/damedane.js',
          to: path.resolve(__dirname, 'dist/damedane.mod.js')
        },
        {
          from: './src/damedane.d.ts',
          to: path.resolve(__dirname, 'dist/damedane.mod.d.ts')
        }
      ]
    })
  ]
}
