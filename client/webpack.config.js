module.exports = {
  entry: "./index.js",
  output: {
    filename: "dist/bundle.js"
  },
  devServer: {
    inline: true,
    port: 8080
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
