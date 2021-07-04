const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env, argv) => {
  const MODE = argv.mode === "development";
  const enabledSourceMap = MODE;

  return {
    mode: MODE,
    devServer: {
      contentBase: path.join(__dirname, "docs"),
      compress: true,
      host: "0.0.0.0",
      disableHostCheck: true,
      watchContentBase: true,
      port: 7777,
      open: true
    },
    entry: "./src/index.js",
    output: {
      filename: "js/main.js",
      path: path.join(__dirname, "docs")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          ]
        },
        {
          test: /\.scss/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  url: true,
                  sourceMap: enabledSourceMap,
                  importLoaders: 2
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: enabledSourceMap
                }
              }
            ]
          })
        },
        {
          test: /\.(eot|otf|ttf|woff2?)(\?.+)?$/,
          use: {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: function(url) {
                return url.replace(/font/, '..')
              }
            }
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [new ExtractTextPlugin("./style.css")]
  };
};
