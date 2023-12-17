import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const useYoutube = (
  breakpoint: string,
  videoId: string,
  pos: number,
  volRef: React.MutableRefObject<number>,
  setVolume: React.Dispatch<React.SetStateAction<number>>,
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  hideUI: (videoId?: string) => void,
) => {
  const [player, setPlayer] = useState<any>(null);
  const firstLoadRef = useRef(true);
  const timeoutIDRef = useRef<NodeJS.Timeout>();

  const onPlayerReady = (e: any) => {
    e.target.playVideo();
  };

  const onPlayerStateChange = (e: any) => {
    if (e.target) {
      switch (e.data) {
        case 0:
          e.target.playVideo();
          break;
        case 1:
          toast.dismiss();
          timeoutIDRef.current = setTimeout(
            () => setIsVideoPlaying(true),
            1000,
          );
          setVolume(() => volRef.current);
          hideUI();
          break;
        case 2:
          e.target.playVideo();
          break;
      }
    }
  };

  const onPlayerError = (e: any) => {
    toast("Trailer not available");
    e.target.stopVideo();
    setIsVideoPlaying(false);
    clearTimeout(timeoutIDRef.current);
    hideUI();
  };

  useEffect(() => {
    const callback = (): void => {
      setPlayer(
        new window.YT.Player("player", {
          videoId: videoId,
          playerVars: {
            enablejsapi: 1,
            controls: 0,
            mute: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
          },
        }),
      );
    };

    if (breakpoint !== "lg" && breakpoint !== "xl" && breakpoint !== "2xl") {
      player?.stopVideo();
      setIsVideoPlaying(false);
      clearTimeout(timeoutIDRef.current);
      return;
    }

    if (!videoId) {
      if (firstLoadRef.current) {
        firstLoadRef.current = false;
      } else {
        player?.stopVideo();
        setIsVideoPlaying(false);
        clearTimeout(timeoutIDRef.current);
      }
      return;
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = callback;
    } else {
      if (!player) {
        callback();
      }
      player?.loadVideoById && player?.loadVideoById(videoId);
    }
  }, [breakpoint, videoId, pos, player]);

  return { player };
};

export { useYoutube };
