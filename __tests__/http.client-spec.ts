/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('node-fetch');

import fetch from 'node-fetch';
const { Response, Headers } = jest.requireActual('node-fetch');

import { DefaultHttpClient } from '../src/apollo.ai/http.client';
import { HttpClient, HttpMethod } from '../src/apollo.ai/interfaces/http.client.interfaces';

describe('http client', () => {
  let client: HttpClient;
  let fetchMock: jest.Mock;

  beforeAll(() => {
    // typecast mocked node-fetch module
    fetchMock = fetch as any;
  });

  beforeEach(() => {
    client = new DefaultHttpClient();
    fetchMock.mockReset();
  });

  it('basic test', () => {
    const expectedResult = { result: 'mocked' };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(expectedResult), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }),
    );

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith('https://api.apollo.ai/abstract', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        timeout: 10000,
      });
      expect(result.status).toEqual(200);
      expect(result.data).toMatchObject(expectedResult);
    });
  });

  it('authorization header', () => {
    const expectedResult = { result: 'mocked' };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(expectedResult), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }),
    );

    client.setAuthorizationHeader('Bearer S3cr3tAp1T0k3n');

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith('https://api.apollo.ai/abstract', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer S3cr3tAp1T0k3n',
        },
        method: 'POST',
        timeout: 10000,
      });
      expect(result.status).toEqual(200);
      expect(result.data).toMatchObject(expectedResult);
    });
  });

  it('options test', () => {
    const expectedResult = { result: 'mocked' };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(expectedResult), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      }),
    );

    client.setAuthorizationHeader(null);

    return client
      .request('https://api.apollo.ai/abstract', {
        data: { input: 'mocked' },
        method: HttpMethod.GET,
        timeout: 3000,
        headers: {
          'X-API-KEY': 'another-secret',
        },
      })
      .then(result => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('https://api.apollo.ai/abstract', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': 'another-secret',
          },
          method: 'GET',
          body: JSON.stringify({ input: 'mocked' }),
          timeout: 3000,
        });
        expect(result.status).toEqual(200);
        expect(result.data).toMatchObject(expectedResult);
      });
  });

  it('incorrect request test', () => {
    const expectedResult = { message: 'Incorrect Parameters' };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify(expectedResult), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 400,
      }),
    );

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(400);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
    });
  });

  it('failed request test', () => {
    const expectedResult = { message: 'API request failed' };
    fetchMock.mockRejectedValue(expectedResult);

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(500);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
    });
  });

  it('incorrect response test', () => {
    const expectedResult = { message: 'incorrect response' };
    fetchMock.mockResolvedValue({
      status: 400,
      headers: new Headers(),
      text: jest.fn().mockResolvedValue('incorrect response'),
    });

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(400);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
    });
  });

  it('invalid response test', () => {
    const expectedResult = { message: 'API request failed', error: 'invalid response' };
    fetchMock.mockResolvedValue({
      status: 503,
      headers: new Headers(),
      text: jest.fn().mockRejectedValue('invalid response'),
    });

    return client.request('https://api.apollo.ai/abstract').then(result => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(503);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
    });
  });
});
