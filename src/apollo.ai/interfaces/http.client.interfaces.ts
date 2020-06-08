/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClient {
  setAuthorizationHeader(value: string): HttpClient;
  request<T = any>(url: string, data?: any, options?: HttpOptions): Promise<HttpResponse<T>>;
}

export interface HttpOptions {
  method?: HttpMethod;
  headers?: HttpHeaders;
  timeout?: number;
  retries?: number;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
}

export interface HttpHeaders {
  [name: string]: string;
}

export interface HttpResponse<T = any> {
  status: number;
  data?: T;
  error?: SimpleError | Error;
}

export interface SimpleError {
  message: string;
  error?: any;
}

declare type Error = { [key: string]: any };
