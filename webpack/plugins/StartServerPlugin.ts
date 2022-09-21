import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import http from 'http';
import { Socket } from 'node:net';
import path from 'node:path';
import requireFromString from 'require-from-string';
import { Compiler, WebpackPluginInstance } from 'webpack';

import { startServer } from '../../src/server/utils';

const pluginName = 'StartServerPlugin';

export default class StartServerPlugin implements WebpackPluginInstance {
  private _server: http.Server | null = null;

  private _sockets = new Set<Socket>();

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
      console.info('Loading new server code ...\n');
      dotenv.config({ override: true });
      const { createApp } = requireFromString(
        serverCode,
        path.join(outputPath, serverFileName)
      );
      if (!createApp || typeof createApp !== 'function') {
        throw new Error('Точка входа должна экспортировать функцию createApp');
      }

      const app = await createApp();

      this._server = startServer(app, 3000);
      this._server.on('connection', (socket) => {
        this._sockets.add(socket);
        socket.on('close', () => {
          this._sockets.delete(socket);
        });
      });
    });
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
      }
    });
  }
}
