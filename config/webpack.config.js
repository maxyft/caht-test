const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: `./src/index.ts`
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    modules: ['node_modules', path.resolve('./src')]
  },
  module: {
    rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      }
    },
    {
      test: /\.ts$/,
      exclude: [
        /node_modules/
      ],
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    },
    {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./src/index.html')
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    })
  ],
  devServer: {
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: './src',
    open: true
  }
}
