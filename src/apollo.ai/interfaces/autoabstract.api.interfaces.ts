export type AutoAbstractParameters = AutoAbstractTextParameters | AutoAbstractUrlParameters;

export interface AutoAbstractTextParameters extends CommonAutoAbstractParameters {
  headline: string;
  text: string;
}
export interface AutoAbstractUrlParameters extends CommonAutoAbstractParameters {
  url: string;
}
export interface CommonAutoAbstractParameters {
  maxCharacters?: number;
  keywords?: string[];
  maxSentences?: number;
  debug?: boolean;
}

export interface AutoAbstractResponse {
  sentences: string[];
  detectedLanguage?: string;
  processedLanguage?: string;
  input?: any;
  type?: string;
  url?: string;
}
