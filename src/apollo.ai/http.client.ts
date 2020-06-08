import got from 'got';
import { isString } from 'lodash';

import { HttpClient, HttpOptions, HttpMethod, HttpResponse } from './interfaces/http.client.interfaces';

const DEFAULT_OPTIONS: HttpOptions = {
  method: HttpMethod.POST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  retries: 2,
};

export class GotHttpClient implements HttpClient {
  private _options: HttpOptions;

  constructor(timeout = 10000) {
    this._options = {
      ...DEFAULT_OPTIONS,
      timeout,
    };
  }

  setAuthorizationHeader(value: string) {
    if (value) {
      this._options.headers['Authorization'] = value;
    } else {
      delete this._options.headers['Authorization'];
    }
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request<T = any>(url: string, data: any = {}, options: HttpOptions = DEFAULT_OPTIONS) {
    const httpOptions = this._mergeOptions(options);
    return got(url, {
      ...httpOptions,
      json: httpOptions.method === HttpMethod.POST ? data : undefined,
      responseType: 'json',
      retry:
        httpOptions.retries > 0
          ? {
              limit: httpOptions.retries || 2,
              methods: Object.values(HttpMethod),
            }
          : 0,
      throwHttpErrors: false,
    })
      .then((res) => {
        return {
          status: res.statusCode,
          ...(res.statusCode === 200
            ? { data: res.body }
            : {
                error: isString(res) ? { message: res } : res.body,
              }),
        } as HttpResponse<T>;
      })
      .catch<HttpResponse<T>>((err) => {
        return {
          status: 500,
          error: { message: 'API request failed', error: err },
        };
      });
  }

  private _mergeOptions(options: HttpOptions) {
    return {
      ...this._options,
      ...options,
      headers: { ...this._options.headers, ...options.headers },
    } as HttpOptions;
  }
}
