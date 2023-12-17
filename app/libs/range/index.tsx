import React, { useRef, useCallback } from "react";
import Slider from "react-rangeslider";
import { Button } from "@/app/components/Button";
import { Icons } from "@/app/libs/icons";
import { useSnapshot } from "valtio";
import { store } from "../valtio";
import { useJikanAnime } from "@/app/hooks/useFetch";
import "react-rangeslider/lib/index.css";
import "./override.css";
import styles from "./styles.module.css";

type Props = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  hideUI: () => void;
};

const Volume = ({ volume, setVolume, hideUI }: Props) => {
  const snap = useSnapshot(store);
  const { anime } = useJikanAnime();
  const volRef = useRef<number>(volume);
  const videoId = anime?.data[snap.pos]?.trailer.youtube_id;

  const handleChange = (value: number) => {
    hideUI();
    setVolume(() => value);
  };

  const toggleMute = useCallback((): void => {
    if (volume === 0) {
      setVolume(volRef.current);
    } else {
      volRef.current = volume;
      setVolume(0);
    }
  }, [volume]);

  return (
    <div
      className={`slider-vertical ${styles.volume} ${videoId ? "" : styles.hidden
        }`}
    >
      <Slider
        min={0}
        max={100}
        value={volume}
        orientation="vertical"
        onChange={handleChange}
      />
      <Button className={styles.button} onClick={() => toggleMute()}>
        <Icons
          icon={
            volume >= 66
              ? "high"
              : volume >= 33
                ? "mid"
                : volume >= 1
                  ? "low"
                  : "mute"
          }
        />
      </Button>
    </div>
  );
};

export { Volume };
