/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpClient {
  setAuthorizationHeader(value: string): HttpClient;
  request<T = any>(url: string, options?: HttpOptions): Promise<HttpResponse<T>>;
}

export interface HttpOptions {
  method?: HttpMethod;
  headers?: HttpHeaders;
  data?: any;
  timeout?: number;
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
