import { useEffect, useState } from "react";

const useYoutube = (videoId: string, pos: number) => {
  const [player, setPlayer] = useState<any>();

  useEffect(() => {
    const cb = (): void => {
      if (videoId) {
        setPlayer(
          new window.YT.Player("trailer", {
            videoId: videoId,
          }),
        );
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = cb;
    } else {
      player?.destroy();
      cb();
    }
  }, [videoId, pos]);
};

export { useYoutube };
