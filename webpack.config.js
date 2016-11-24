module.exports = {

  entry: './app/index.js',
  output: {
     path: __dirname + '/',
     contentBase: __dirname,
    publicPath: "",
    filename: 'bundle.js'
  },
  devServer: {
        inline: true,
        port: 8080
    }

}
