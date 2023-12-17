import React, { memo, useRef, useEffect } from "react";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { useSnapshot } from "valtio";
import { store } from "@/app/libs/valtio";
import { toast } from "react-toastify";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import styles from "./styles.module.css";
import { useVolume } from "./hooks/useVolume";
import { useYoutube } from "./hooks/useYoutube";

type Props = {
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoPlaying: boolean;
  hideUI: (videoId?: string) => void;
};

const VideoBackground = memo(
  ({
    setVolume,
    volume,
    setIsVideoPlaying,
    isVideoPlaying,
    hideUI,
  }: Props): React.JSX.Element => {
    const { anime } = useJikanAnime();
    const snap = useSnapshot(store);
    const breakpoint = useBreakpoint();
    const volRef = useRef(0);
    const videoId = anime?.data[snap.pos]?.trailer.youtube_id;

    useEffect(() => {
      if (anime) {
        if (!videoId) {
          toast("This anime has no trailer");
          hideUI();
        }
      }
    }, [anime, hideUI]);

    const { player } = useYoutube(
      breakpoint.breakpointW,
      videoId,
      snap.pos,
      volRef,
      setVolume,
      setIsVideoPlaying,
      hideUI,
    );
    useVolume(player, volume, volRef);

    return (
      <div
        className={
          styles["background-video-wrapper"] +
          " " +
          (isVideoPlaying ? styles.visible : "")
        }
      >
        <div id="player" className={styles["background-video"]}></div>
      </div>
    );
  },
);
VideoBackground.displayName = "VideoBackground";

export { VideoBackground };
