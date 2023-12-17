import { proxy } from "valtio";

type Endpoint = "top" | "now" | "upcoming" | "anime";

const store = proxy<{ pos: number; endpoint: Endpoint; anime: string }>({
  pos: 0,
  endpoint: "top",
  anime: "",
});

export { store };
export type { Endpoint };
