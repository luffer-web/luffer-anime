import React, { useEffect } from "react";

const useVolume = (
  player: any,
  volume: number,
  volRef: React.MutableRefObject<number>,
): void => {
  useEffect(() => {
    if (player?.isMuted && player?.isMuted()) {
      player?.unMute();
    }
    player?.setVolume && player?.setVolume(volume);
    volRef.current = volume;
  }, [player, volume]);
};

export { useVolume };
