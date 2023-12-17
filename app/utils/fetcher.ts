import { Endpoint } from "@/app/libs/valtio";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const tagsFetcher = (url: string, id: number) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const data = {
        tags: [],
        relations: null,
      };
      if (json.length > 0) {
        data.tags = json;
        return data;
      }

      return fetch(`https://api.jikan.moe/v4/anime/${id}/relations`)
        .then((res) => res.json())
        .then((json) => {
          data.relations = json;
          return data;
        });
    });

const selectEndpoint = (endpoint: Endpoint, anime: string): string => {
  switch (endpoint) {
    case "top":
      return "https://api.jikan.moe/v4/top/anime";
    case "now":
      return "https://api.jikan.moe/v4/seasons/now";
    case "upcoming":
      return "https://api.jikan.moe/v4/seasons/upcoming";
    case "anime":
      return `https://api.jikan.moe/v4/anime?q=${anime}`;
  }
};

export { fetcher, tagsFetcher, selectEndpoint };
