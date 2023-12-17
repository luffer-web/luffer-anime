import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useJikanAnime, useJikanEpisodes } from "@/app/hooks/useFetch";
import { useSnapshot } from "valtio";
import { store } from "@/app/libs/valtio";
import { SwiperPaginator } from "@/app/libs/swiper";

const Episodes = () => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const [page, setPage] = useState(1);
  const { episodes } = useJikanEpisodes(anime?.data[snap.pos]?.mal_id, page);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (episodes?.pagination) {
      setPages(episodes?.pagination?.last_visible_page);
    }
  }, [episodes]);

  const fill = () => {
    return episodes?.data?.map((episode, i) => {
      return (
        <tr key={i}>
          <td>{episode.mal_id}</td>
          <td>{episode.title}</td>
          <td>{episode.aired?.slice(0, episode.aired?.indexOf("T"))}</td>
        </tr>
      );
    });
  };

  return (
    <section className={styles.section}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>EPISODE</th>
            <th>NAME</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>{fill()}</tbody>
      </table>
      <SwiperPaginator page={page} setPage={setPage} pages={pages} />
    </section>
  );
};

export { Episodes };
