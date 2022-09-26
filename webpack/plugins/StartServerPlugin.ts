import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import http from 'http';
import Module from 'module';
import { Socket } from 'node:net';
import path from 'node:path';
import { Compiler, WebpackPluginInstance } from 'webpack';

const pluginName = 'StartServerPlugin';

export default class StartServerPlugin implements WebpackPluginInstance {
  private _server: http.Server | null = null;

  private _sockets = new Set<Socket>();

  private _clearableModules: string[] = [];

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tapPromise(pluginName, async () => {
      await this._closeServer();
    });
    compiler.hooks.done.tapPromise(pluginName, async (stats) => {
      if (stats.hasErrors()) {
        return;
      }
      const chunkNames = Array.from(stats.compilation.chunks).map(
        (c) => c.name
      );
      let serverChunkName = '';

      if (chunkNames.length === 1) {
        [serverChunkName] = chunkNames;
      } else if (chunkNames.length > 1) {
        if (!chunkNames.includes('server')) {
          throw new Error('Нет точки входа server');
        } else {
          serverChunkName = 'server';
        }
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
      const assetInfo = stats.compilation.assetsInfo;

      for (const [fileName, info] of assetInfo.entries()) {
        for (const hashType of hashTypes) {
          if (
            !serverFileName &&
            info[hashType] &&
            outputFileName
              .replace('[name]', serverChunkName)
              .replace(`[${hashType}]`, info[hashType]) === fileName
          ) {
            serverFileName = fileName;
          }
        }
        if (serverFileName) {
          break;
        }
      }
      if (!serverFileName) {
        throw new Error(`Incorrect output file name ${serverFileName}`);
      }

      const serverCode = await fs
        .readFile(path.join(outputPath, serverFileName))
        .then((code) => code.toString());

      // eslint-disable-next-line no-console
      console.info('\nLoading new server code ...\n');
      dotenv.config({ override: true });

      const { createApp } = this._requireFromString(
        serverCode,
        path.join(outputPath, serverFileName)
      );

      if (!createApp || typeof createApp !== 'function') {
        throw new Error('Точка входа должна экспортировать функцию createApp');
      }

      let app = await createApp();
      app.set('port', 3000);

      await this._startServer(app);
      app = null;
    });
  }

  private async _startServer(app: any) {
    const res = await this._closeServer();
    if (!res) throw new Error('Failed stop');

    this._server = http.createServer(app);
    // this._server.on('error', httpServerErrorHandler(port));
    // this._server.on('listening', logStart);
    this._server.on('connection', (socket) => {
      this._sockets.add(socket);
      socket.on('close', () => {
        this._sockets.delete(socket);
      });
    });
    this._server.listen(3000, '0.0.0.0');
  }

  private _closeServer(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this._server) {
        resolve(true);
      } else {
        // eslint-disable-next-line no-console
        console.info('\nStopping server...\n');
        for (const socket of this._sockets) {
          socket.destroy();
        }
        this._server.close((error) => {
          if (error) {
            reject(error);
          }
          this._server = null;
          resolve(true);
        });
        this._server.unref();
      }
    });
  }

  private _requireFromString(code: string, filename: string) {
    if (typeof code !== 'string') {
      throw new Error(`code must be a string, not ${typeof code}`);
    }

    const clearableKey = Object.keys(require.cache).filter((str) =>
      this._clearableModules.includes(str)
    );
    clearableKey.forEach((key) => {
      delete require.cache[key];
    });

    const m = new Module(filename);
    m.filename = filename;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    m.paths = Module._nodeModulePaths(path.dirname(filename));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    m._compile(code, filename);
    const { exports } = m;

    this._clearableModules = m.children.map(({ id }) => id);
    return exports;
  }
}
