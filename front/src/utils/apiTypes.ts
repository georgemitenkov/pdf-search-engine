export type RequestComponentName = string;
export type RequestKeywords = string;

interface PageResponse {
  number: number;
  content: string
}

export interface SearchResponse {
  pages: PageResponse[];
}

export interface SearchRequest {
  component_name: RequestComponentName;
  keywords: RequestKeywords;
}
