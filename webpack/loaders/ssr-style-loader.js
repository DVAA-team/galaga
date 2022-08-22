const { stringifyRequest } = require('style-loader/dist/utils');

// eslint-disable-next-line @typescript-eslint/no-empty-function
const loaderApi = () => {};

loaderApi.pitch = async function loader(request) {
  // Используем такую же логику как и в исходниках style-loader`а
  // см. node_modules/style-loader/dist/index.js
  const modulePath = stringifyRequest(this, `!!${request}`);

  /**
   * Получаем выход предыдущего loader`а (это должен быть css-loader)
   * берем его дефолтный экспорт и смотрин наличие переменной locals
   * при её налии эскортируем ее по дефолту.
   * подробнее про css-loader https://webpack.js.org/loaders/css-loader/#features
   * по итогу код вы выходном бандле будет содержать только объект locals предоставляемый css-loader
   */
  return `
  import content from ${modulePath};
  export * from ${modulePath};
  export default content && content.locals ? content.locals : undefined;
  `;
};

module.exports = loaderApi;
