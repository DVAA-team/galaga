import { RuleSetUseItem } from 'webpack';
import path from 'node:path';
import TCssLoaderOptions from '../types/cssLoaderOptions';
import { TLoadersSet, TWebpackRulesUseData } from '../types/loader';

type TGetCssLoaders = (
  side: string
) => (data: TWebpackRulesUseData) => RuleSetUseItem[];

const getCssLoaders: TGetCssLoaders = (side) => {
  return (data) => {
    const isModule = /\.module\.css$/.test(data.resource);

    // Базовые свойства лоадера
    const cssLoaderOptions: TCssLoaderOptions = {
      importLoaders: 1,
    };

    // Дополняем свойства
    if (isModule) {
      cssLoaderOptions.modules = {
        localIdentName: '[local]--[hash:base64:5]',
        hashStrategy: 'minimal-subset',
      };
    }

    // Возвращаем настроенную цепочку лоадеров
    return [
      {
        loader:
          side === 'client'
            ? 'style-loader'
            : path.resolve(__dirname, 'ssr-style-loader.js'), // Подключение кастомного лоадера для стилей на сервере
      },
      {
        loader: 'css-loader',
        options: cssLoaderOptions,
        ident: JSON.stringify(cssLoaderOptions),
      },
      {
        loader: 'postcss-loader',
      },
    ];
  };
};

const testRegex = /(\.module)?\.css$/;

const cssLoaders: TLoadersSet = {
  client: {
    test: testRegex,
    use: getCssLoaders('client'),
  },
  server: {
    test: testRegex,
    use: getCssLoaders('server'),
  },
};

export default cssLoaders;
