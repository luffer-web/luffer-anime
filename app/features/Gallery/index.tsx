import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  useJikanAnime,
  useYandereTags,
  useYanderePosts,
} from "@/app/hooks/useFetch";
import { store } from "@/app/libs/valtio";
import { parseString } from "@/app/utils/parseString";
import { useSnapshot } from "valtio";
import {
  SwiperGallery,
  SwiperGalleryMiniatures,
  SwiperPaginator,
} from "@/app/libs/swiper";
import { SwiperSlide } from "swiper/react";
import { YanderePost } from "@/app/types/yandere";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { toast } from "react-toastify";
import Swiper from "swiper";
import { Button } from "@/app/components/Button";
import { Icons } from "@/app/libs/icons";
import { useFilter } from "./hooks/useFilter";
import { calculateAspectRatioFit, shimmer, toBase64 } from "@/app/utils/images";
import styles from "./styles.module.css";

const LIM = 30;

const Gallery = () => {
  const { pos } = useSnapshot(store);
  const { anime } = useJikanAnime();
  const [title, setTitle] = useState<string>("");
  const id = anime?.data[pos]?.mal_id;
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState<string>("");
  const { data } = useYandereTags(title, id);
  const { yandere } = useYanderePosts(tag, LIM, page);
  const relationsRef = useRef<string[]>([]);
  const [relationsPos, setRelationsPos] = useState<null | number>(null);
  const [relationsTrys, setRelationsTrys] = useState<null | number>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<null | Swiper>(null);
  const [swiper, setSwiper] = useState<null | Swiper>(null);
  const [miniaturePos, setMiniaturePos] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [filter, setFilter] = useFilter(swiper, thumbsSwiper);
  const screen = useBreakpoint();

  useEffect(() => {
    if (anime) {
      setRelationsPos(null);
      setRelationsTrys(null);
      setMiniaturePos(0);
      setPage(1);
      setTitle(parseString(anime?.data[pos]?.title));
      relationsRef.current = [];
      swiper?.slideTo(0);
      thumbsSwiper?.slideTo(0);
    }
  }, [anime, pos]);

  useEffect(() => {
    swiper?.slideTo(0);
    thumbsSwiper?.slideTo(0);
  }, [page]);

  useEffect(() => {
    if (relationsPos !== null) {
      if (relationsTrys === null) {
        switch (anime.data[pos].mal_id) {
          case 22:
            relationsRef.current.push("prince of tennis");
            setRelationsTrys(0);
            return;
          case 30:
          case 31:
          case 32:
            relationsRef.current.push("evangelion");
            setRelationsTrys(0);
            return;
          case 43:
            relationsRef.current.push("ghost in the shell");
            setRelationsTrys(0);
            return;
        }
        data!.relations!.data.map((relation) => {
          relation.entry.map((entry) => {
            relationsRef.current.push(entry.name);
          });
        });

        relationsRef.current = relationsRef.current.map((relation: string) => {
          const colonIndex = relation?.indexOf(":");
          if (colonIndex !== undefined && colonIndex !== -1) {
            if (relation[colonIndex + 1] !== " ") {
              return relation?.replace(":", "_");
            } else {
              return relation?.slice(0, colonIndex);
            }
          }
          return relation;
        });
        relationsRef.current = relationsRef.current.filter(
          (value, index, array) => array.indexOf(value) === index,
        );
        setRelationsTrys(0);
        return;
      }

      let loops = 0;
      let oldWord = 0;
      let newWord = 0;
      for (let i = 0; i < relationsRef.current.length; i++) {
        for (let j = 0; j < relationsRef.current[i].length; j++) {
          if (relationsRef.current[i][j] === " ") {
            newWord++;
          }
        }
        if (newWord >= oldWord) {
          oldWord = newWord;
          loops++;
          newWord = 0;
        } else {
          break;
        }
      }
      if (relationsPos === loops) {
        const newArr = relationsRef.current.map((relation) => {
          if (relation[0].toLowerCase() === relation[0].toUpperCase()) {
            return relation.slice(1);
          }
          return relation.lastIndexOf(" ") !== -1
            ? relation.slice(0, relation.lastIndexOf(" "))
            : relation;
        });
        if (JSON.stringify(newArr) === JSON.stringify(relationsRef.current)) {
          if (data?.tags === null) {
            toast("No gallery!");
          }
          relationsRef.current = [];
          setRelationsPos(0);
        } else {
          relationsRef.current = [...newArr];
          setRelationsPos(null);
          setRelationsTrys(relationsTrys! + 1);
        }
      } else {
        setTitle(parseString(relationsRef.current[relationsPos]));
      }
    }
  }, [relationsPos]);

  useEffect(() => {
    if (relationsTrys !== null) {
      relationsRef.current = relationsRef.current.filter(
        (value, index, array) => array.indexOf(value) === index,
      );
      if (relationsRef.current.length > 1) {
        relationsRef.current = relationsRef.current.sort(
          (a: string, b: string) => {
            const arr = [a, b];
            const equals = [0, 0];
            for (let i = 0; i < 2; i++) {
              for (
                let j = 0;
                j <
                (arr[i].length < anime.data[pos].title.length
                  ? arr[i].length
                  : anime.data[pos].title.length);
                j++
              ) {
                if (arr[i][j] === anime.data[pos].title[j]) {
                  equals[i]++;
                }
              }
            }

            return equals[1] - equals[0];
          },
        );
      }
      setTitle((old) =>
        parseString(relationsRef.current[relationsPos!]) === old
          ? parseString(relationsRef.current[relationsPos!] + ".")
          : parseString(relationsRef.current[relationsPos!]),
      );
    }
  }, [relationsTrys]);

  useEffect(() => {
    if (data && data.tags !== null && data.tags.length > 0) {
      let index = 0;
      let auxCount = 0;
      let counter = 0;
      for (let i = 0; i < data.tags.length; ++i) {
        // Get the length of the shortest name
        const length =
          data.tags[i].name.length > title.length
            ? title.length
            : data.tags[i].name.length;
        // Compare names and count the amount of matching characters
        for (let j = 0; j < length; j++) {
          if (data.tags[i].name[j] === title[j]) {
            counter++;
          }
        }
        // If theres more matches than the previous loop then it store the index of the tag.
        // Also if there is no images then it does not store it regardless of the matching characters
        if (counter > auxCount && data.tags[i].count > 0) {
          auxCount = counter;
          index = i;
        }
        counter = 0;
      }
      setTag(data.tags[index].name.replaceAll(";", "%3B"));
      setCount(data.tags[index].count);
    } else if (data && data.relations && data.relations.data?.length > 0) {
      relationsPos === null
        ? setRelationsPos(0)
        : setRelationsPos((old) => old! + 1);
      return;
    }
  }, [data, data?.tags, parseString, setTitle]);

  return (
    <section className={styles.section}>
      <SwiperGallery
        setMiniaturePos={setMiniaturePos}
        setSwiper={setSwiper}
        thumbsSwiper={thumbsSwiper}
      >
        {yandere?.posts
          ?.filter((post: YanderePost) => {
            return filter ? true : post.rating !== "q" && post.rating !== "e";
          })
          .map((post: YanderePost, i: number) => (
            <SwiperSlide key={i} className={`${styles.slide}`}>
              <Image
                src={post.sample_url}
                alt={post.tags}
                height={
                  calculateAspectRatioFit(
                    post.sample_width,
                    post.sample_height,
                    screen.width,
                    screen.height * 0.7,
                  ).height
                }
                width={
                  calculateAspectRatioFit(
                    post.sample_width,
                    post.sample_height,
                    screen.width,
                    screen.height * 0.7,
                  ).width
                }
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(
                    calculateAspectRatioFit(
                      post.sample_width,
                      post.sample_height,
                      screen.width,
                      screen.height * 0.7,
                    ).height,
                    calculateAspectRatioFit(
                      post.sample_width,
                      post.sample_height,
                      screen.width,
                      screen.height * 0.7,
                    ).width,
                  ),
                )}`}
                style={{
                  alignSelf: "center",
                  overflow: "hidden",
                  borderRadius: "1rem",
                }}
                onClick={() =>
                  window.open(post.file_url, "_blank", "noreferrer=true")
                }
              />
            </SwiperSlide>
          ))}
      </SwiperGallery>
      <SwiperGalleryMiniatures
        setThumbsSwiper={setThumbsSwiper}
        setMiniaturePos={setMiniaturePos}
      >
        {yandere?.posts
          ?.filter((post: YanderePost) => {
            return filter ? true : post.rating !== "q" && post.rating !== "e";
          })
          .map((post: YanderePost, i: number) => (
            <SwiperSlide key={i}>
              <Image
                src={post.preview_url}
                alt={post.tags}
                width={75}
                height={75}
                style={{
                  borderRadius: "1rem",
                  objectFit: "cover",
                  filter: i === miniaturePos ? "" : "brightness(0.50)",
                  border:
                    i === miniaturePos ? "2px solid var(--light-100)" : "",
                }}
              />
            </SwiperSlide>
          ))}
      </SwiperGalleryMiniatures>
      <SwiperPaginator lim={LIM} count={count} page={page} setPage={setPage} />
      <Button
        className={`${styles.filter} ${filter ? styles["filter-active"] : ""}`}
        onClick={() => setFilter(!filter)}
      >
        <Icons icon="danger" />
      </Button>
    </section>
  );
};

export { Gallery };
