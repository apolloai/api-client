/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultApiClient, ApiClient } from '../src/index';
import { HttpClient } from '../src/apollo.ai/interfaces/http.client.interfaces';

import { createMockHttpClient } from './__mocks__/http.client-mock';

describe('api client - clustering', () => {
  let client: ApiClient;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeAll(() => {
    client = new DefaultApiClient('mock-token');
  });

  beforeEach(() => {
    // mock httpClient
    (client as any).httpClient = mockHttpClient = createMockHttpClient();
  });

  // TODO: implement
  xit('basic test', () => {
    mockHttpClient.request.mockResolvedValue({
      status: 200,
      data: {},
    });

    // return client.clustering([]).then(result => {
    //   expect(mockHttpClient.request).toBeCalledTimes(1);
    //   expect(result).toBeDefined();
    //   expect(result.data.length).toEqual(3);
    // });
  });
});
