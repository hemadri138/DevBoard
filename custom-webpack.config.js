const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const shouldAnalyze = process.env.ANALYZE === 'true';

module.exports = {
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 8,
      minSize: 20000,
      cacheGroups: {
        ngrx: {
          test: /[\\/]node_modules[\\/]@ngrx[\\/]/,
          name: 'vendor-ngrx',
          priority: 30
        },
        charts: {
          test: /[\\/]node_modules[\\/](chart\.js|ng2-charts)[\\/]/,
          name: 'vendor-charts',
          priority: 25
        },
        angular: {
          test: /[\\/]node_modules[\\/]@angular[\\/]/,
          name: 'vendor-angular',
          priority: 20
        }
      }
    }
  },
  plugins: [
    ...(shouldAnalyze
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html'
          })
        ]
      : [])
  ]
};
