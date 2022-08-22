import { Compiler, WebpackPluginInstance } from 'webpack';
import { spawn } from 'child_process';

const pluginName = 'OnFirstBuildDonePlugin';

type TOnFirstBuildDonePluginOptions = {
  command: string;
};

export default class OnFirstBuildDonePlugin implements WebpackPluginInstance {
  private _command: string;

  private _isInitialBuild = true;

  constructor({ command }: TOnFirstBuildDonePluginOptions) {
    this._command = command;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.done.tap(pluginName, (_compilation) => {
      if (this._isInitialBuild && compiler.watchMode) {
        this._isInitialBuild = false;
        spawn(this._command, {
          stdio: 'inherit',
          shell: true,
        });
      }
    });
  }
}
