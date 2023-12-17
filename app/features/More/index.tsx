import Image from "next/image";
import { useJikanAnime } from "@/app/hooks/useFetch";
import { useSnapshot } from "valtio";
import { store } from "@/app/libs/valtio";
import { Synopsis } from "@/app/features/Synopsis";
import { Trailer } from "@/app/features/Trailer";
import styles from "./styles.module.css";

const More = () => {
  const { anime } = useJikanAnime();
  const snap = useSnapshot(store);
  const cover =
    anime?.data[snap.pos]?.images.webp.large_image_url ||
    (process.env.NEXT_PUBLIC_NO_IMAGE_URL as string);
  const title = anime?.data[snap.pos]?.title;
  const synopsis = anime?.data[snap.pos]?.synopsis;

  return (
    <section className={styles.section}>
      <div className={styles.cover}>
        <Image
          src={cover}
          alt={`${title} cover image`}
          fill={true}
          style={{
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "1rem",
          }}
          unoptimized={true}
        />
      </div>
      <Synopsis>{synopsis}</Synopsis>
      <Trailer />
    </section>
  );
};

export { More };
