import fetch from 'node-fetch';

import { HttpClient, HttpOptions, HttpMethod, HttpResponse } from './interfaces/http.client.interfaces';
import { isString, pickBy } from 'lodash';

const DEFAULT_OPTIONS: HttpOptions = {
  method: HttpMethod.POST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export class DefaultHttpClient implements HttpClient {
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
  async request<T = any>(url: string, options: HttpOptions = DEFAULT_OPTIONS) {
    let statusCode: number;
    return fetch(url, this._buildRequestInit(options))
      .then(r => {
        statusCode = r.status;
        const isJson = (r.headers.get('content-type') || '').includes('application/json');
        return isJson ? r.json() : r.text();
      })
      .then(res => {
        return {
          status: statusCode,
          ...(statusCode === 200
            ? { data: res }
            : {
                error: isString(res) ? { message: res } : res,
              }),
        } as HttpResponse<T>;
      })
      .catch<HttpResponse<T>>(err => {
        return {
          status: statusCode >= 300 ? statusCode : 500,
          error: { message: 'API request failed', error: err },
        };
      });
  }

  /**
   * merges
   * @param options HttpOptions for the request
   */
  private _buildRequestInit(options: HttpOptions) {
    return pickBy(
      {
        ...this._mergeOptions(options),
        body: JSON.stringify(options.data),
      },
      (value, key) => {
        return value && key != 'data';
      },
    );
  }

  private _mergeOptions(options: HttpOptions) {
    return {
      ...this._options,
      ...options,
      headers: { ...this._options.headers, ...options.headers },
    } as HttpOptions;
  }
}
