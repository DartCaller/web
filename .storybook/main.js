const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../assets/images');

module.exports = {
  "stories": ['../components/**/*.stories.@(js)'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // 'PRODUCTION' is used when building the static version of storybook.
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../'),
      'assets/images': path.resolve(__dirname, '../assets/images'),
    };

    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = pathToInlineSvg;

    config.module.rules.push({
      test: /\.png$/,
      include: path.resolve(__dirname, '../assets/images'),
      use: [{
        loader: 'file-loader',
        options: { esModule: false, name: 'static/media/[path][name].[ext]' },
      }],
    });

    config.module.rules.push({
      test: /\.svg$/,
      include: pathToInlineSvg,
      use: [{
        loader: 'vue-svg-loader',
        options: {
          svgo: false,
        },
      }],
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
}
