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
