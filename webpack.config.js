module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'index.js',
    library: 'spritebatch',
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ],
        },
      },
      {
        test: /\.[vert]|[frag]$/,
        use: 'raw-loader',
      },
    ],
  }
};
