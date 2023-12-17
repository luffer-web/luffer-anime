import Image from "next/image";
import React, {
  useCallback,
  useState,
  memo,
  forwardRef,
  useEffect,
} from "react";
import { Button } from "@/app/components/Button";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { SwiperMiniatures } from "@/app/libs/swiper";
import { Endpoint, store } from "@/app/libs/valtio";
import { updateStore } from "@/app/utils/store";
import { useSnapshot } from "valtio";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import { Icons } from "@/app/libs/icons";
import styles from "./styles.module.css";

type Props = {
  setIsInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hideUI: (trailer?: string) => void;
};

const Fetcher = memo(
  forwardRef<HTMLInputElement, Props>(
    ({ setIsInputOpen, hideUI }, inputRef) => {
      const { anime } = useJikanAnime();
      const snap = useSnapshot(store);
      const [swiper, setSwiper] = useState<null | Swiper>(null);
      const [end, setEnd] = useState(false);
      const trailer = anime?.data[snap.pos]?.trailer.youtube_id;

      useEffect(() => {
        if (end && !trailer) {
          setEnd(false);
          hideUI();
        }
      }, [end, trailer, hideUI]);

      const handleTransitionEnd = () => {
        if (
          !(
            inputRef as React.MutableRefObject<HTMLInputElement>
          )?.current?.classList.contains(styles.open)
        ) {
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          )?.current?.classList.remove(styles.color);
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          )?.current?.classList.remove(styles.padding);
        }
        setEnd(true);
      };

      const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        // If search button has the focus then handleSearch function will blur
        if (
          e.relatedTarget !==
            (inputRef as React.MutableRefObject<HTMLInputElement>)?.current &&
          e.relatedTarget?.id !== "search"
        ) {
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          ).current?.classList.remove(styles.open);
          setIsInputOpen(() => false);
        }
      };

      const handleClick = useCallback(
        (endpoint: Endpoint, anime?: string) => {
          updateStore(0, endpoint, anime);
          swiper?.slideTo(0);
        },
        [swiper],
      );

      const handleSearch = useCallback(() => {
        if (
          !(
            inputRef as React.MutableRefObject<HTMLInputElement>
          )?.current?.classList.contains(styles.open)
        ) {
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          ).current?.classList.add(styles.open);
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          ).current?.classList.add(styles.color);
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          )?.current?.classList.add(styles.padding);
          (
            inputRef as React.MutableRefObject<HTMLInputElement>
          ).current?.focus();
          setIsInputOpen(() => true);
        } else {
          if (
            (inputRef as React.MutableRefObject<HTMLInputElement>).current
              ?.value === ""
          ) {
            (
              inputRef as React.MutableRefObject<HTMLInputElement>
            ).current?.classList.remove(styles.open);
            setIsInputOpen(() => false);
          } else if (
            (inputRef as React.MutableRefObject<HTMLInputElement>).current
              ?.value !== ""
          ) {
            handleClick(
              "anime",
              (inputRef as React.MutableRefObject<HTMLInputElement>).current
                ?.value,
            );
            (
              inputRef as React.MutableRefObject<HTMLInputElement>
            ).current?.classList.remove(styles.open);
            (
              inputRef as React.MutableRefObject<HTMLInputElement>
            ).current?.blur();
            setIsInputOpen(() => false);
          }
        }
      }, [handleClick, setIsInputOpen, inputRef]);

      const handleKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key === "Enter") {
            handleSearch();
          }
        },
        [handleSearch],
      );

      return (
        <>
          <nav className={`${styles.nav}`}>
            <ul>
              <li
                className={`${snap.endpoint === "top" ? styles.selected : ""}`}
                onClick={() => handleClick("top")}
              >
                TOP
              </li>
              <li
                className={`${snap.endpoint === "now" ? styles.selected : ""}`}
                onClick={() => handleClick("now")}
              >
                NOW
              </li>
              <li
                className={`${
                  snap.endpoint === "upcoming" ? styles.selected : ""
                }`}
                onClick={() => handleClick("upcoming")}
              >
                UPCOMING
              </li>
              <li
                className={`${
                  snap.endpoint === "anime" ? styles.selected : ""
                }`}
                onClick={() => handleClick("anime")}
              >
                ANIME
              </li>
            </ul>
          </nav>
          <SwiperMiniatures setSwiper={setSwiper}>
            {anime?.data?.map((anime, i) => (
              <SwiperSlide key={i} className={`${styles.slide}`}>
                <Image
                  src={anime.images.webp.image_url}
                  alt={anime.title}
                  fill={true}
                  style={{
                    objectFit: "cover",
                    overflow: "hidden",
                    borderRadius: "1rem",
                    filter: i === snap.pos ? "" : "brightness(0.50)",
                    border: i === snap.pos ? "2px solid var(--light-100)" : "",
                  }}
                  priority={true}
                />
              </SwiperSlide>
            ))}
          </SwiperMiniatures>
          <div className={styles["search-bar"]}>
            <input
              type="text"
              ref={inputRef}
              onBlur={handleBlur}
              onTransitionEnd={handleTransitionEnd}
              onKeyUp={handleKeyUp}
            />
            <Button
              id="search"
              className={styles.button}
              onClick={handleSearch}
            >
              <Icons icon="search" />
            </Button>
          </div>
        </>
      );
    },
  ),
);
Fetcher.displayName = "Fetcher";

export { Fetcher };
