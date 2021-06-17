module.exports = {
  entry: ['react-hot-loader/patch', './src/index.js'], // [] 여러 파일도 가능
  mode: 'development',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },

  devServer: {
    hot: true, // 수정시 리로드
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    contentBase: __dirname + '/public/', // index파일 위치
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          presets: ['@babel/react', '@babel/env'], // js 로 변경 , css 같은 파일도 설정 가능
          plugins: [
            'react-hot-loader/babel', // hot loader
          ],
        },
      },
    ],
  },

  // plugins: [
  //     new webpack.HotModuleReplacementPlugin() // reload
  // ]
};
