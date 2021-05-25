const { resolve } = require("path");
const { runInNewContext } = require("vm");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      // rules are used for compile time loading and recognising files whereas plugins are used to make changes on run time
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ], // css loader will be able to recognise css files, able to import them and include in build file. but won't attach css to dom.
      },
      {
        test: /\.svg$/,
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin(),
  ],
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    stats: "errors-only",
    overlay: true,
  };
}

module.exports = config;
