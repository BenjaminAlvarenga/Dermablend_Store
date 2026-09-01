module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Reanimated 4 (SDK 54): el plugin ya está integrado en babel-preset-expo.
    // No se agrega manualmente aquí.
  };
};
