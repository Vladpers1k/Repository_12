const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PRO = !IS_DEV

const optimize = () => {
  return {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()]
  }
}

const getFilename = (ext) => `[name]${IS_DEV ? '' : '.[hash]'}.${ext}`

const setCssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const setJsLoaders = (extra) => {
  const loaders = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }

  if (extra) {
    loaders.options.presets.push(extra)
  }

  return loaders
}

const setPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'), // Шлях до index.html
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: getFilename('css')
    }),
    new EslintWebpackPlugin({
      extensions: ['js'],
      fix: true
    })
  ]

  return plugins
}

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.jsx',
    stat: './statistics.ts'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFilename('js'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  optimization: optimize(),
  devServer: {
    port: 4200,
    hot: false
  },
  devtool: IS_DEV ? 'source-map' : false,
  plugins: setPlugins(),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: setJsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-react')
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: setJsLoaders('@babel/preset-typescript')
      },
      {
        test: /\.css$/i,
        use: setCssLoaders()
      },
      {
        test: /\.less$/i,
        use: setCssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: setCssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
