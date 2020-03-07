import * as _ from 'lodash';
import { URL } from 'url';
import {
  ApiClient,
  AutoAbstractResponse,
  ClusteringArticle,
  ClusteringLanguage,
  ClusteringResponse,
  Article,
  ContinuousClusteringResultItem,
  ContinuousClusteringOptions,
  ContinuousClusteringResponse,
  ContinuousClusteringInput,
  AutoAbstractParameters,
  ExtractionParameters,
  ExtractorResponse,
  SanitizorParameters,
  SanitizorResponse,
} from './interfaces/api.interfaces';
import { DefaultHttpClient } from './http.client';
import { HttpResponse } from './interfaces/http.client.interfaces';

const ENDPOINT_APOLLOAPI = 'https://api.apollo.ai';
const ENDPOINT_AUTOABSTRACT = ENDPOINT_APOLLOAPI + '/autoabstract';
const ENDPOINT_EXTRACTOR = ENDPOINT_APOLLOAPI + '/extraction/extract';
const ENDPOINT_SANITIZOR = ENDPOINT_APOLLOAPI + '/extraction/sanitize';
const ENDPOINT_CLUSTERING = ENDPOINT_APOLLOAPI + '/clustering';
const ENDPOINT_COMBINEDAPI = ENDPOINT_APOLLOAPI + '/combinedapi';

export class DefaultApiClient implements ApiClient {
  private httpClient = new DefaultHttpClient();

  constructor(protected apiKey: string) {
    this.httpClient.setAuthorizationHeader('Bearer ' + apiKey);
  }

  // Endpoint Autoabstract
  async autoabstract(parameters: AutoAbstractParameters) {
    return this.httpClient
      .request<AutoAbstractResponse>(ENDPOINT_AUTOABSTRACT, {
        data: {
          maxCharacters: 400,
          ...parameters,
          keywords: parameters.keywords ? parameters.keywords.join(',') : '',
        },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return this._rejectHttpResponse(response, 'autoabstract');
        }
      });
  }

  // // Endpoint Clustering
  // async clustering(articles: ClusteringArticle[], threshold = 0.8, language = ClusteringLanguage.de) {
  //   const endpointUrl = new URL(ENDPOINT_CLUSTERING);
  //   endpointUrl.searchParams.append('threshold', threshold.toString());
  //   endpointUrl.searchParams.append('language', language);

  //   return this.httpClient
  //     .request<ClusteringResponse>(endpointUrl.toString(), {
  //       data: articles,
  //       timeout: 300000,
  //     })
  //     .then(response => {
  //       if (response.data) {
  //         return response.data;
  //       } else {
  //         return this._rejectHttpResponse(response, 'clustering');
  //       }
  //     });
  // }

  // // Endpoint continuedClustering + Autoabstract
  // async continuedClustering(newArticles: Array<Article | string>, presentArticles: ContinuousClusteringResultItem[] = [], options: ContinuousClusteringOptions = {}) {
  //   try {
  //     this._checkForDuplicateArticleIds(newArticles, presentArticles);
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }

  //   const parameters: ContinuousClusteringInput = {
  //     newArticles,
  //     result: presentArticles,
  //   };

  //   const url = this._buildContinuousClusteringUrl(options);

  //   return this.httpClient
  //     .request<ContinuousClusteringResponse>(url.toString(), {
  //       data: parameters,
  //       timeout: 300000,
  //     })
  //     .then(response => {
  //       if (response.data) {
  //         return response.data;
  //       } else {
  //         return this._rejectHttpResponse(response, 'clustering');
  //       }
  //     });
  // }

  async extract(parameters: ExtractionParameters) {
    return this.httpClient
      .request<ExtractorResponse>(ENDPOINT_EXTRACTOR, {
        data: parameters,
        timeout: 10000,
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return this._rejectHttpResponse(response, 'extraction');
        }
      });
  }

  async sanitize(parameters: SanitizorParameters) {
    return this.httpClient
      .request<SanitizorResponse>(ENDPOINT_SANITIZOR, {
        data: parameters,
        timeout: 10000,
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return this._rejectHttpResponse(response, 'extraction');
        }
      });
  }

  // private _checkForDuplicateArticleIds(newArticles: Array<Article | string>, presentArticles: ContinuousClusteringResultItem[]) {
  //   const newArticleIds = newArticles.map((nA: Article | string): string => {
  //     if (typeof nA === 'string') {
  //       return nA;
  //     } else {
  //       return nA.id;
  //     }
  //   });
  //   const presentArticleIds = presentArticles.map((pA, index) => {
  //     if (pA && pA.article && pA.article.id) {
  //       return pA.article.id;
  //     } else {
  //       throw new Error('Invalid present Article' + pA + ' at position ' + index);
  //     }
  //   });
  //   const duplicates = _.intersection(newArticleIds, presentArticleIds);
  //   if (duplicates.length !== 0) {
  //     throw new Error('Passing the same article in newArticles and presentArticles is not allowed.');
  //   }
  // }

  // private _buildContinuousClusteringUrl(options: ContinuousClusteringOptions): URL {
  //   const url = new URL(ENDPOINT_COMBINEDAPI);

  //   if (options.abstractMaxChars !== undefined) {
  //     url.searchParams.append('maxChars', options.abstractMaxChars.toString());
  //   }

  //   if (options.keywords) {
  //     url.searchParams.append('keywords', options.keywords.join(','));
  //   }

  //   if (options.threshold !== undefined) {
  //     url.searchParams.append('threshold', options.threshold.toString());
  //   }

  //   if (options.language) {
  //     url.searchParams.append('language', options.language);
  //   }

  //   return url;
  // }

  private _rejectHttpResponse(response: HttpResponse, endpoint: string) {
    return Promise.reject({ message: `Received invalid response from ${endpoint} endpoint`, error: _.get(response, 'error') });
  }
}
