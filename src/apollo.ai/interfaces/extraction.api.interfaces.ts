export interface ExtractionParameters {
  url: string;
  options?: ExtractorOptions;
}

export enum ExtractionServices {
  CUSTOM = 'custom',
  Mercury = 'mercury',
  DiffBot = 'diffbot',
  Embedly = 'embedly',
}

export interface ExtractorOptions {
  /**
   * @param url used to enforce rules for this particular URL
   */
  url?: string;
  /**
   * @param extractors used to override or enforce specific extration services
   */
  extractors?: ExtractionServices[];
  /**
   * @param filters used to override the list of applied filters
   */
  filters?: string[];
  /**
   * @param debug if set it will return meta data for the extraction
   */
  debug?: boolean;
  /**
   * @param noCache if set it will disable caching for the extraction
   */
  noCache?: boolean;
}

export interface ExtractorMetaData {
  /**
   * @param input the input params of the request
   */
  input?: {
    url: string;
    options?: ExtractorOptions;
  };
  /**
   * @param extractor the used extraction service
   */
  extractor?: ExtractionServices;
  /**
   * @param filters list of all the applied filters
   */
  filters?: string[];
}

export interface ExtractorResponse {
  title: string;
  text: string;
  description?: string;
  datePublished?: Date;
  image?: string;
  html?: string;
  url?: string;
  domain?: string;
  author?: string;
  meta?: ExtractorMetaData;
}

export interface SanitizorParameters {
  content: string;
  options?: ExtractorOptions;
}

export interface SanitizorResponse {
  content: string;
  filters?: string[];
}
