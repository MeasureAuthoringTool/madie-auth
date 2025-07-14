import singleSpaDefaults from "webpack-config-single-spa-ts";
import HtmlWebpackPlugin from "html-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import path from "path";
import { fileURLToPath } from 'url';
import { mergeWithRules } from 'webpack-merge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "madie",
    projectName: "madie-auth",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });


  const polyfillConfig = {
    resolve: {
      alias: {
        'node-fetch': false, // blocks direct usage
        'buffer': path.resolve(__dirname, 'node_modules/buffer/'), // 💥 FIX
      },
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "crypto-browserify": path.resolve('crypto-browserify'),
      },
    },
    plugins: [
      new NodePolyfillPlugin()
    ],
  };


  const customOverrides = {
    module: {
      rules: [
        // babelLoaderRule,
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.scss$/,
          resolve: {
            extensions: [".scss", ".sass"],
          },
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true, importLoaders: 2 },
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true },
            },
            "sass-loader",
          ],
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "local-dev-env"),
          publicPath: "/importmap",
        },
        {
          directory: path.join(__dirname, "node_modules/@madie/madie-root/dist/"),
          publicPath: "/",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(
          __dirname,
          "node_modules/@madie/madie-root/dist/index.html"
        ),
      }),
    ],
  };

  const externalsConfig = {
    target: "es2022",
    output: {
      filename: "madie-madie-auth.js",
      module: true,
      library: {
        type: "module"
      }
    },
    experiments: {
      outputModule: true
    },
    externalsType: "module",
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react-dom/client": "react-dom/client", 
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
      "@madie/madie-util": "@madie/madie-util",
    },
  }

  return mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
    plugins: "append",
  })(defaultConfig, customOverrides, externalsConfig, polyfillConfig);
};
