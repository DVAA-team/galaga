import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private _handleResponse({ data }: AxiosResponse) {
    return data;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  protected _handleError(error: any) {
    return Promise.reject(error);
  }
}
