import React from "react";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return <h2 className={`${styles.title}`}>{children}</h2>;
};

export { Title };
