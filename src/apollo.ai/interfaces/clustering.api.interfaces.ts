export interface ClusteringResponse {
  status: number;
  message: string;
  data: ClusteringArticle[][];
}

export interface ContinuousClusteringResponse {
  status: number;
  message: string;
  data: ClusteringArticle[][];
}

export interface ClusteringArticle {
  identifier: string;
  title: string;
  content: string;
  link?: string;
  publication_date?: string;
  image?: string;
}

export enum ClusteringLanguage {
  en = 'en',
  de = 'de',
}

export interface Article {
  id: string;
  headline?: string;
  content: string;
  url?: string;
  date?: Date;
  abstract?: string[];
}

///
/// ContinuousClustering
/// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
export interface ContinuousClusteringOptions {
  abstractMaxChars?: number;
  keywords?: string[];
  threshold?: number;
  language?: ClusteringLanguage;
}

export interface ContinuousClustering {
  newArticles?: Array<Article | string>;
  result?: ContinuousClusteringResultItem[];
}

export interface ContinuousClusteringInput extends ContinuousClustering {
  options?: ContinuousClusteringOptions;
}

export interface ContinuousClusteringResponse extends ContinuousClustering {
  invalidArticles: Array<string | Article>; // TODO: define if only string!
}

export interface ContinuousClusteringResultItem {
  article: Article;
  related: string[]; // array of article ids
}
