import React, { memo } from "react";
import styles from "./styles.module.css";

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <small>Copyright 2023 &copy; Luffer Anime</small>
    </footer>
  );
});
Footer.displayName = "Footer";

export { Footer };
