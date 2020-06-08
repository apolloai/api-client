/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiClient, ApolloaiApiClient } from '../src/index';
import { HttpClient } from '../src/apollo.ai/interfaces/http.client.interfaces';

import { createMockHttpClient } from './__mocks__/http.client.mock';

describe('api client - extraction', () => {
  let client: ApolloaiApiClient;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeAll(() => {
    client = new ApiClient('mock-token');
  });

  beforeEach(() => {
    // mock httpClient
    (client as any).httpClient = mockHttpClient = createMockHttpClient();
  });

  it('basic extractor test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 200,
      data: {
        text: 'Lorem ipsum dolor sit amet',
      },
    });

    return client
      .extract({
        url: 'https://demo.url',
      })
      .then((result) => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(result).toBeDefined();
        expect(result.text).toEqual('Lorem ipsum dolor sit amet');
      });
  });

  it('fail extractor test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 500,
      error: { message: 'failed request' },
    });

    return client
      .extract({
        url: 'https://demo.url',
      })
      .then(() => {
        fail('should not be sucessful');
      })
      .catch((err) => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(err).toMatchObject({ message: 'Received invalid response from extraction endpoint' });
      });
  });

  it('basic sanitize test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 200,
      data: {
        content: 'Lorem ipsum dolor sit amet',
      },
    });

    return client
      .sanitize({
        content: '<h1>Lorem</h1> ipsum <b>dolor</b> sit amet',
      })
      .then((result) => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(result).toBeDefined();
        expect(result.content).toEqual('Lorem ipsum dolor sit amet');
      });
  });

  it('fail sanitize test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 500,
      error: { message: 'failed request' },
    });

    return client
      .sanitize({
        content: '<h1>Lorem</h1> ipsum <b>dolor</b> sit amet',
      })
      .then(() => {
        fail('should not be sucessful');
      })
      .catch((err) => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(err).toMatchObject({ message: 'Received invalid response from extraction endpoint' });
      });
  });
});
