type DMY = {
  day: number;
  month: number;
  year: number;
};

type Prop = {
  prop: {
    from: DMY;
    to: DMY;
  };
};

type JikanAnimeData = {
  mal_id: number;
  images: {
    webp: {
      small_image_url: string;
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  synopsis: string;
  trailer: {
    youtube_id: string;
  };
  type: string;
  source: string;
  episodes: number;
  status: string;
  rating: string;
  aired: Prop;
};

type JikanAnime = {
  data: JikanAnimeData[];
};

type EntryData = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type JikanRelationsData = {
  relation: string;
  entry: EntryData[];
};

type JikanRelations = {
  data: JikanRelationsData[];
};

type JikanEpisodeData = {
  mal_id: number;
  title: string;
  aired: string;
};

type JikanEpisodes = {
  data: JikanEpisodeData[];
  pagination: {
    last_visible_page: number;
  };
};

type JikanVoiceActor = {
  language: string;
  person: {
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
};

type JikanCharacterData = {
  character: {
    images: {
      webp: {
        image_url: string;
        small_image_url: string;
      };
    };
    name: string;
  };
  voice_actors: JikanVoiceActor[];
};

type JikanCharacters = {
  data: JikanCharacterData[];
};

export type {
  JikanAnime,
  JikanAnimeData,
  Prop,
  JikanRelations,
  JikanRelationsData,
  EntryData,
  JikanEpisodes,
  JikanEpisodeData,
  JikanCharacters,
  JikanCharacterData,
  JikanVoiceActor,
};
