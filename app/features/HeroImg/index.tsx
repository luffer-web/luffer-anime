"use client";

import React from "react";
import { useSnapshot } from "valtio";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { store } from "@/app/libs/valtio";

type Props = {
  children: React.ReactNode;
};

const HeroImg = ({ children }: Props): React.JSX.Element => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const image =
    anime?.data[snap.pos]?.images.webp.large_image_url ||
    process.env.NEXT_PUBLIC_NO_IMAGE_URL;

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};

export { HeroImg };
