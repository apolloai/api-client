/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultApiClient, ApiClient } from '../src/index';
import { HttpClient } from '../src/apollo.ai/interfaces/http.client.interfaces';

import { createMockHttpClient } from './__mocks__/http.client-mock';

describe('api client - autoabstract', () => {
  let client: ApiClient;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeAll(() => {
    client = new DefaultApiClient('mock-token');
  });

  beforeEach(() => {
    // mock httpClient
    (client as any).httpClient = mockHttpClient = createMockHttpClient();
  });

  it('basic test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 200,
      data: {
        sentences: ['Mock Sentence #1', 'Mock Sentence #2', 'Mock Sentence #3'],
      },
    });

    return client
      .autoabstract({
        url: 'https://demo.url',
        keywords: [],
      })
      .then(result => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(result).toBeDefined();
        expect(result.sentences.length).toEqual(3);
      });
  });

  it('fail test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 500,
      error: { message: 'failed request' },
    });

    return client
      .autoabstract({
        url: 'https://demo.url',
      })
      .then(() => {
        fail('should not be sucessful');
      })
      .catch(err => {
        expect(mockHttpClient.request).toBeCalledTimes(1);
        expect(err).toMatchObject({ message: 'Received invalid response from autoabstract endpoint' });
      });
  });
});
