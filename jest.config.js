module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
  moduleNameMapper: {
    '^.+/(.*\\.svg)\\?inline$': '<rootDir>/assets/images/$1',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$)|vuesax)'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node'],
}
