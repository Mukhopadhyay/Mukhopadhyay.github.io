export type Dataset = {
  name: string;
  description: string;
  kaggleUrl: string;
  rating: number | string;
  ratingType?: string;
  publishDate?: string | undefined;
  published?: boolean | undefined;
  repository?: string | undefined;
};

type Documentation = {
  platform: string;
  url: string;
};

export type Project = {
  name: string;
  description: string;
  url: string;
  rating?: number | string;
  ratingType?: string;
  publishedDate?: string | undefined;
  published?: boolean | undefined;
  repository?: string | undefined;
  documentation?: Documentation;
};
