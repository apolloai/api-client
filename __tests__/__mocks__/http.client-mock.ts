import { HttpClient } from '../../src/apollo.ai/interfaces/http.client.interfaces';

export function createMockHttpClient() {
  return {
    setAuthorizationHeader: jest.fn(),
    request: jest.fn(),
  } as jest.Mocked<HttpClient>;
}
