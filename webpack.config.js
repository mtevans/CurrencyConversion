module.exports = {
  entry: {
    app: ["./lib/entry.js", "./lib/animation.js"]
  },
  output: {
  	filename: "./lib/bundle.js"
  },
  module: {
  loaders: [
    {
      test: [/\.js?$/],
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }
  ]
},
  devtool: 'source-map',
  resolve: {
    extensions: ["",".js"]
  }
};
