import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import createDebug from '@/utils/debug';

const debug = createDebug.extend('httpClient');

export abstract class AbstractHttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        /* eslint-disable @typescript-eslint/naming-convention */
        'Content-Type': 'application/json',
        /* eslint-enable @typescript-eslint/naming-convention */
      },
      withCredentials: true,
      timeout: 5000,
    });

    this._initializeResponseInterceptor =
      this._initializeResponseInterceptor.bind(this);
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private _handleResponse(response: AxiosResponse) {
    debug(
      'success %s response: %o',
      `${response.config.baseURL}${response.config.url}`,
      response
    );
    return response;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  protected _handleError(error: any) {
    if (error instanceof AxiosError) {
      debug(
        'error %s %s response: %o',
        error.code,
        `${error.config.baseURL}${error.config.url}`,
        error.response
      );
    } else {
      debug('unknown error %O', error);
    }
    return Promise.reject(error);
  }
}
