import { Endpoint, store } from "@/app/libs/valtio";

const updateStore = (pos: number, endpoint: Endpoint, anime?: string): void => {
  store.pos = pos;
  store.endpoint = endpoint;
  store.anime = anime ?? store.anime;
};

const updatePos = (pos: number): void => {
  store.pos = pos;
};

const updateEndpoint = (endpoint: Endpoint): void => {
  store.endpoint = endpoint;
};

const updateAnime = (anime: string): void => {
  store.anime = anime;
};

export { updateStore, updatePos, updateEndpoint, updateAnime };
