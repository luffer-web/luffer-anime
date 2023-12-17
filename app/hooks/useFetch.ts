import useSWR from "swr";
import { tagsFetcher, fetcher, selectEndpoint } from "@/app/utils/fetcher";
import { store } from "@/app/libs/valtio";
import { useSnapshot } from "valtio";
import {
  JikanAnime,
  JikanCharacters,
  JikanEpisodes,
  JikanRelations,
} from "@/app/types/jikan";
import { Yandere, YandereTags } from "@/app/types/yandere";

type JikanResponse = {
  anime: JikanAnime;
  isLoading: boolean;
  isError: any;
};
type JikanEpisodesResponse = {
  episodes: JikanEpisodes;
  isLoading: boolean;
  isError: any;
};
type JikanCharacterResponse = {
  characters: JikanCharacters;
  isLoading: boolean;
  isError: any;
};
type YandereTagsResponse = {
  data:
    | undefined
    | {
        tags: null | YandereTags;
        relations: null | JikanRelations;
      };
  isLoading: boolean;
  isError: any;
};
type YandereResponse = {
  yandere: Yandere;
  isLoading: boolean;
  isError: any;
};

const useJikanAnime = (): JikanResponse => {
  const snap = useSnapshot(store);
  const url = selectEndpoint(snap.endpoint, snap.anime);
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    anime: data,
    isLoading,
    isError: error,
  };
};

const useJikanEpisodes = (id: number, page: number): JikanEpisodesResponse => {
  const { data, error, isLoading } = useSWR(
    `https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`,
    fetcher,
  );

  return {
    episodes: data,
    isLoading,
    isError: error,
  };
};

const useYandereTags = (title: string, id: number): YandereTagsResponse => {
  const { data, error, isLoading } = useSWR(
    `https://yande.re/tag.json?api_version=2&name=${title}&limit=100`,
    (url) => tagsFetcher(url, id),
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

const useYanderePosts = (
  tag: string,
  limit: number,
  page: number,
): YandereResponse => {
  const { data, error, isLoading } = useSWR(
    tag
      ? `https://yande.re/post/index.json?api_version=2&tags=${tag}&limit=${limit}&page=${page}`
      : null,
    fetcher,
  );

  return {
    yandere: data,
    isLoading,
    isError: error,
  };
};

export { useJikanAnime, useYandereTags, useYanderePosts, useJikanEpisodes };

export type { JikanCharacterResponse };
