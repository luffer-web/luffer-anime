import React, { memo, useContext, useRef, useState } from "react";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { updatePos } from "@/app/utils/store";
import Swiper from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { Button } from "@/app/components/Button";
import { Icons } from "@/app/libs/icons";
import { FullpageContext } from "@/app/contexts/fullpage";
import "swiper/css/thumbs";
import "swiper/css";
import styles from "./styles.module.css";
import "./override.css";

type SwiperMiniaturesProps = {
  setSwiper: React.Dispatch<React.SetStateAction<Swiper | null>>;
  children: React.ReactNode;
};

const SwiperMiniatures = memo(
  ({ setSwiper, children }: SwiperMiniaturesProps) => {
    const fullpageApi = useContext(FullpageContext);
    const ref = useRef<NodeJS.Timeout>();
    const breakpoint = useBreakpoint();
    let slidesPerView: number = 2;

    switch (breakpoint.breakpointW) {
      case "lg":
        if (breakpoint.breakpointH === "sm") {
          slidesPerView = 7;
        } else if (breakpoint.breakpointH === "md") {
          slidesPerView = 6;
        } else if (breakpoint.breakpointH === "xl") {
          slidesPerView = 3;
        }
        break;
      case "xl":
        slidesPerView = 4;
        break;
      case "2xl":
        slidesPerView = 5;
        break;
    }

    return (
      <SwiperComponent
        onSwiper={setSwiper}
        grabCursor={true}
        slidesPerView={slidesPerView}
        loop={true}
        spaceBetween={16}
        className={`mySwiper ${styles["swiper-miniatures"]}`}
        onClick={(swiper) => {
          if (swiper.clickedIndex !== undefined) {
            updatePos(swiper.clickedIndex);
          }
        }}
        onSliderMove={() => {
          clearTimeout(ref.current);
          fullpageApi!.setAllowScrolling(false);
          ref.current = setTimeout(() => {
            if (!fullpageApi) {
              return;
            }
            fullpageApi.setAllowScrolling(true);
          }, 1000);
        }}
      >
        {children}
      </SwiperComponent>
    );
  },
);
SwiperMiniatures.displayName = "SwiperMiniatures";

type SwiperGalleryProps = {
  setMiniaturePos: React.Dispatch<React.SetStateAction<number>>;
  setSwiper: React.Dispatch<React.SetStateAction<null | Swiper>>;
  thumbsSwiper: null | Swiper;
  children: React.ReactNode;
};
const SwiperGallery = memo(
  ({
    setMiniaturePos,
    setSwiper,
    thumbsSwiper,
    children,
  }: SwiperGalleryProps) => {
    const fullpageApi = useContext(FullpageContext);
    const ref = useRef<NodeJS.Timeout>();

    return (
      <SwiperComponent
        onSwiper={setSwiper}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        grabCursor={true}
        loop={true}
        className={`mySwiper ${styles["swiper-gallery"]}`}
        onTransitionEnd={(swiper) => setMiniaturePos(swiper.activeIndex)}
        onSliderMove={() => {
          clearTimeout(ref.current);
          fullpageApi!.setAllowScrolling(false);
          ref.current = setTimeout(() => {
            if (!fullpageApi) {
              return;
            }
            fullpageApi.setAllowScrolling(true);
          }, 1000);
        }}
      >
        {children}
      </SwiperComponent>
    );
  },
);
SwiperGallery.displayName = "SwiperGallery";

type SwiperGalleryMiniaturesProps = {
  setThumbsSwiper: React.Dispatch<React.SetStateAction<null | Swiper>>;
  setMiniaturePos: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
};
const SwiperGalleryMiniatures = memo(
  ({
    setThumbsSwiper,
    setMiniaturePos,
    children,
  }: SwiperGalleryMiniaturesProps) => {
    const fullpageApi = useContext(FullpageContext);
    const ref = useRef<NodeJS.Timeout>();
    const screen = useBreakpoint();
    let slidesPerView = 4;

    switch (screen.breakpointW) {
      case "md":
        slidesPerView = 8;
        break;
      case "lg":
        slidesPerView = 12;
        break;
      case "xl":
        slidesPerView = 16;
        break;
      case "2xl":
        slidesPerView = 20;
        break;
    }

    return (
      <SwiperComponent
        onSwiper={setThumbsSwiper}
        grabCursor={true}
        slidesPerView={slidesPerView}
        spaceBetween={64}
        watchSlidesProgress={true}
        freeMode={true}
        focusableElements="input, select, option, textarea, video, label"
        modules={[Thumbs, FreeMode]}
        loop={true}
        onSliderMove={() => {
          clearTimeout(ref.current);
          fullpageApi!.setAllowScrolling(false);
          ref.current = setTimeout(() => {
            if (!fullpageApi) {
              return;
            }
            fullpageApi.setAllowScrolling(true);
          }, 1000);
        }}
        onClick={(swiper) => {
          if (swiper.clickedIndex !== undefined) {
            setMiniaturePos(() => swiper.clickedIndex);
          }
        }}
        className={`mySwiper ${styles["swiper-gallery-miniatures"]}`}
      >
        {children}
      </SwiperComponent>
    );
  },
);
SwiperGalleryMiniatures.displayName = "SwiperGalleryMiniatures";

type SwiperPaginatorProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  pages?: number;
  lim?: number;
  count?: number;
};
const SwiperPaginator = memo(
  ({ page, setPage, pages, lim, count }: SwiperPaginatorProps) => {
    const [swiper, setSwiper] = useState<null | Swiper>(null);
    const total = pages ?? Math.ceil(count! / lim!);
    const arr = new Array(total).fill(0);
    const screen = useBreakpoint();
    const fullpageApi = useContext(FullpageContext);
    const ref = useRef<NodeJS.Timeout>();
    let slidesPerView = 2;

    switch (screen.breakpointW) {
      case "md":
        slidesPerView = 8;
        break;
      case "lg":
        slidesPerView = 12;
        break;
      case "xl":
        slidesPerView = 16;
        break;
      case "2xl":
        slidesPerView = 20;
        break;
    }

    return (
      <div className={styles.paginator}>
        <Button className={styles["mr-1"]} onClick={() => swiper?.slideTo(0)}>
          <Icons icon="first" />
        </Button>
        <Button className={styles["mr-1"]} onClick={() => swiper?.slidePrev()}>
          <Icons icon="previous" />
        </Button>
        <SwiperComponent
          grabCursor={true}
          slidesPerView={slidesPerView}
          spaceBetween={16}
          onSliderMove={() => {
            clearTimeout(ref.current);
            fullpageApi!.setAllowScrolling(false);
            ref.current = setTimeout(() => {
              if (!fullpageApi) {
                return;
              }
              fullpageApi.setAllowScrolling(true);
            }, 1000);
          }}
          className={`mySwiper ${styles["swiper-paginator"]}`}
          watchSlidesProgress={true}
          focusableElements="input, select, option, textarea, video, label"
          onSwiper={setSwiper}
        >
          {arr.map((_el, i) => (
            <SwiperSlide key={i} className={styles["mr-1"]}>
              <Button
                style={{
                  color: page === i + 1 ? "#FFCCFF" : "#FFFFFF",
                }}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            </SwiperSlide>
          ))}
        </SwiperComponent>
        <Button className={styles["ml-1"]} onClick={() => swiper?.slideNext()}>
          <Icons icon="next" />
        </Button>
        <Button
          className={styles["ml-1"]}
          onClick={() => swiper?.slideTo(total - 1)}
        >
          <Icons icon="last" />
        </Button>
      </div>
    );
  },
);
SwiperPaginator.displayName = "SwiperPagintor";

export {
  SwiperMiniatures,
  SwiperGallery,
  SwiperGalleryMiniatures,
  SwiperPaginator,
};
