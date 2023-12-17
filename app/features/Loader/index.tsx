"use client";

import Image from "next/image";
import { useEffect, useRef, memo } from "react";
import spinnerSVG from "@/public/spinner.svg";
import bg from "@/public/bg.jpg";
import styles from "./styles.module.css";

const Loader = memo(() => {
  const loaderRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setTimeout(
      () => (loaderRef.current!.style.transform = "translateY(-100%)"),
      2000,
    );
  }, []);

  return (
    <section className={`${styles.heroImg}`} ref={loaderRef}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={bg}
          alt="bg"
          placeholder="blur"
          className={styles.image}
          priority
        />
        <div className={styles.opacity}>
          <h2 className={`${styles.title}`}>LUFFER ANIME</h2>
          <Image
            src={spinnerSVG}
            alt="Loading"
            className={styles.spinner}
            priority
          />
        </div>
      </div>
    </section>
  );
});
Loader.displayName = "Loader";

export { Loader };
