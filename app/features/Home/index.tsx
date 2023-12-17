import Image from "next/image";
import React, { useContext, useState, useRef } from "react";
import { useSnapshot } from "valtio";
import { Title } from "@/app/components/Title";
import { Info } from "@/app/features/Info";
import { Fetcher } from "@/app/features/Fetcher";
import { Button } from "@/app/components/Button";
import { Footer } from "@/app/features/Footer";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { store } from "@/app/libs/valtio";
import { FullpageContext } from "@/app/contexts/fullpage";
import { VideoBackground } from "@/app/features/VideoBackground";
import { Volume } from "@/app/libs/range";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import chibi from "@/public/chibi.png";
import styles from "./styles.module.css";

const HIDE_UI_TIME = 3000;

const Main = (): React.JSX.Element => {
  const fullpageApi = useContext(FullpageContext);
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const breakpoint = useBreakpoint();
  const [volume, setVolume] = useState(0);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const hideUIIDRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const title = anime?.data[snap.pos]?.title;

  const hideUI = () => {
    if (
      breakpoint.breakpointW === "lg" ||
      breakpoint.breakpointW === "xl" ||
      breakpoint.breakpointW === "2xl"
    ) {
      ref.current!.classList.remove(styles.opacity);
      clearTimeout(hideUIIDRef.current);
      hideUIIDRef.current = setTimeout(() => {
        if (!isInputOpen && isVideoPlaying) {
          ref.current!.classList.add(styles.opacity);
        }
      }, HIDE_UI_TIME);
    } else {
      clearTimeout(hideUIIDRef.current);
    }
  };

  hideUI();

  return (
    <section onMouseMove={hideUI}>
      <VideoBackground
        setVolume={setVolume}
        volume={volume}
        setIsVideoPlaying={setIsVideoPlaying}
        isVideoPlaying={isVideoPlaying}
        hideUI={hideUI}
      />
      <div className={styles.section} ref={ref}>
        <h1>Luffer Anime</h1>
        <Image src={chibi} alt="logo" className="logo" width={40} height={40} />
        <Volume volume={volume} setVolume={setVolume} hideUI={hideUI} />
        <Title>{title}</Title>
        <Info />
        <Fetcher
          setIsInputOpen={setIsInputOpen}
          hideUI={hideUI}
          ref={inputRef}
        />
        <Button
          className={`${styles.button}`}
          onClick={() => fullpageApi?.moveTo(2)}
        >
          MORE
        </Button>
        <Footer />
      </div>
    </section>
  );
};

export { Main };
