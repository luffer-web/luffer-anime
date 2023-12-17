type YandereTags = {
  ambiguous: boolean;
  count: number;
  id: number;
  name: string;
  type: number;
}[];

type YanderePost = {
  file_url: string;
  preview_url: string;
  sample_url: string;
  sample_height: number;
  sample_width: number;
  rating: string;
  id: number;
  tags: string;
};

type Yandere = {
  posts: YanderePost[];
};

export type { Yandere, YanderePost, YandereTags };
