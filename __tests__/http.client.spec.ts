import * as nock from 'nock';

import { HttpClient, HttpMethod } from '../src/apollo.ai/interfaces/http.client.interfaces';
import { GotHttpClient } from '../src/apollo.ai/http.client';

describe('http client', () => {
  let client: HttpClient;

  beforeEach(() => {
    client = new GotHttpClient();
  });

  it('basic test', () => {
    const expectedResult = { result: 'mocked' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(200, expectedResult);

    return client.request('https://api.apollo.ai/autoabstract').then((result) => {
      expect(result.status).toEqual(200);
      expect(result.data).toMatchObject(expectedResult);
      scope.done();
    });
  });

  it('authorization header', () => {
    const expectedResult = { result: 'mocked' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .matchHeader('authorization', 'Bearer S3cr3tAp1T0k3n')
      .post('/autoabstract')
      .reply(200, expectedResult);

    client.setAuthorizationHeader('Bearer S3cr3tAp1T0k3n');

    return client.request('https://api.apollo.ai/autoabstract').then((result) => {
      expect(result.status).toEqual(200);
      expect(result.data).toMatchObject(expectedResult);
      scope.done();
    });
  });

  it('options test', () => {
    const expectedResult = { result: 'mocked' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .matchHeader('x-api-key', 'another-secret')
      .get('/autoabstract')
      .reply(200, expectedResult);

    client.setAuthorizationHeader(null);

    return client
      .request(
        'https://api.apollo.ai/autoabstract',
        { input: 'mocked' },
        {
          method: HttpMethod.GET,
          timeout: 3000,
          headers: {
            'X-API-KEY': 'another-secret',
          },
        },
      )
      .then((result) => {
        expect(result.status).toEqual(200);
        expect(result.data).toMatchObject(expectedResult);
        scope.done();
      });
  });

  it('incorrect request test', () => {
    const expectedResult = { message: 'Incorrect Parameters' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(400, expectedResult);

    return client.request('https://api.apollo.ai/autoabstract').then((result) => {
      expect(result.status).toEqual(400);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
      scope.done();
    });
  });

  it('failed request test (with retries)', () => {
    const expectedResult = { message: 'API request failed' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(500, {
        status: 500,
        error: expectedResult,
      });
    const scopeRetry1 = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(500, {
        status: 500,
        error: expectedResult,
      });
    const scopeRetry2 = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(500, expectedResult);

    return client.request('https://api.apollo.ai/autoabstract').then((result) => {
      expect(result.status).toEqual(500);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
      scope.done();
      scopeRetry1.done();
      scopeRetry2.done();
    });
  }, 5000);

  it('incorrect response test', () => {
    const expectedResult = 'incorrect response';
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(400, expectedResult);

    return client.request('https://api.apollo.ai/autoabstract').then((result) => {
      expect(result.status).toEqual(400);
      expect(result.data).toBeUndefined();
      expect(result.error).toEqual(expectedResult);
      scope.done();
    });
  });

  it('invalid response test', () => {
    const expectedResult = { message: 'API request failed', error: 'invalid response' };
    const scope = nock('https://api.apollo.ai')
      .matchHeader('accept', 'application/json')
      .matchHeader('content-type', 'application/json')
      .post('/autoabstract')
      .reply(503, expectedResult);

    return client.request('https://api.apollo.ai/autoabstract', {}, { retries: 0 }).then((result) => {
      expect(result.status).toEqual(503);
      expect(result.data).toBeUndefined();
      expect(result.error).toMatchObject(expectedResult);
      scope.done();
    });
  });
});
