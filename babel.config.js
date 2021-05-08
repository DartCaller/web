module.exports = function (api) {
  api && api.cache(true)
  const presets = ['@babel/preset-env']
  const plugins = [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': '.',
          '~': '.',
        },
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
