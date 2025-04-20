const path = require("path")

/**@type {import('webpack').Configuration}*/
const config = {
  target: "node", // vscode extensions run in a Node.js-context
  entry: {
    extension: "./src/extension.ts", // the entry point of this extension
    chat: "./src/webview/chat/index.tsx", // entry point for chat webview
    sidebar: "./src/webview/sidebar/index.tsx", // entry point for sidebar webview
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}

module.exports = config
