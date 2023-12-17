import React from "react";
import { store } from "@/app/libs/valtio";
import { useSnapshot } from "valtio";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { useYoutube } from "./hooks/useYoutube";
import styles from "./styles.module.css";

const Trailer = (): React.JSX.Element => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const videoId = anime?.data[snap.pos]?.trailer.youtube_id;

  useYoutube(videoId, snap.pos);

  return <div id="trailer" className={styles.trailer}></div>;
};

export { Trailer };
