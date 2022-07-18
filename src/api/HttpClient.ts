import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { clientToServerNaming } from '../utils/convertNaming';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: clientToServerNaming({
        contentType: 'application/json',
      }) as AxiosRequestHeaders,
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

  // eslint-disable-next-line class-methods-use-this
  protected _handleError(error: any) {
    return Promise.reject(error);
  }
}
