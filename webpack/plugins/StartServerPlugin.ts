import { Compiler, WebpackPluginInstance } from 'webpack';
import path from 'node:path';
import http from 'http';

const pluginName = 'StartServerPlugin';

export default class StartServerPlugin implements WebpackPluginInstance {
  private _server: http.Server | null = null;

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tapPromise(pluginName, async () => {
      await this._closeServer();
    });
    compiler.hooks.done.tapPromise(pluginName, async (stats) => {
      const chunkNames = Array.from(stats.compilation.chunks).map(
        (c) => c.name
      );
      if (!chunkNames.includes('server') || !chunkNames.includes('utils')) {
        throw new Error('неправильно сконфигурированна секция entry');
      }

      const { filename: outputFileName, path: outputPath } =
        stats.compilation.outputOptions;
      if (typeof outputFileName !== 'string') {
        throw new Error('Output file name must by string');
      }
      if (!outputPath) {
        throw new Error('Undefined output path');
      }

      const hashTypes = ['fullhash', 'chunkhash', 'modulehash', 'contenthash'];

      let serverFileName = '';
      let utilsFileName = '';
      const assetInfo = stats.compilation.assetsInfo;

      for (const [fileName, info] of assetInfo.entries()) {
        for (const hashType of hashTypes) {
          if (
            !serverFileName &&
            info[hashType] &&
            outputFileName
              .replace('[name]', 'server')
              .replace(`[${hashType}]`, info[hashType]) === fileName
          ) {
            serverFileName = fileName;
          }
          if (
            !utilsFileName &&
            info[hashType] &&
            outputFileName
              .replace('[name]', 'utils')
              .replace(`[${hashType}]`, info[hashType]) === fileName
          ) {
            utilsFileName = fileName;
          }
        }
        if (serverFileName && utilsFileName) {
          break;
        }
      }
      if (!serverFileName) {
        throw new Error('Incorrect output file name');
      }

      const { startServer } = await import(
        path.join(outputPath, utilsFileName)
      );
      const { app } = await import(path.join(outputPath, serverFileName));

      if (typeof startServer !== 'function') {
        throw new Error('Неправильный экспорт из файла utils');
      }

      this._server = startServer(app, 3000);
    });
  }

  private _closeServer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this._server) {
        resolve(true);
      } else {
        // eslint-disable-next-line no-console
        console.info('Stopping server...');
        this._server.close((error) => {
          if (error) {
            reject(error);
          }
          this._server = null;
          resolve(true);
        });
      }
    });
  }
}
