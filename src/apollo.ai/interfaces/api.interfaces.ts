import { AutoAbstractResponse, AutoAbstractParameters } from './autoabstract.api.interfaces';
import {
  ClusteringArticle,
  ClusteringLanguage,
  ClusteringResponse,
  Article,
  ContinuousClusteringResultItem,
  ContinuousClusteringOptions,
  ContinuousClusteringResponse,
} from './clustering.api.interfaces';
import { ExtractionParameters, ExtractorResponse, SanitizorParameters, SanitizorResponse } from './extraction.api.interfaces';

export * from './autoabstract.api.interfaces';
export * from './clustering.api.interfaces';
export * from './extraction.api.interfaces';

export interface ApiClient {
  autoabstract(parameters: AutoAbstractParameters): Promise<AutoAbstractResponse>;

  // TODO: refactor those APIs
  // clustering(articles: ClusteringArticle[], threshold?: number, language?: ClusteringLanguage): Promise<ClusteringResponse>;
  // continuedClustering(newArticles: Array<Article | string>, presentArticles?: ContinuousClusteringResultItem[], options?: ContinuousClusteringOptions): Promise<ContinuousClusteringResponse>;

  extraction(parameters: ExtractionParameters): Promise<ExtractorResponse>;
  sanitize(parameters: SanitizorParameters): Promise<SanitizorResponse>;
}
