import React from "react";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { useLimit } from "./hooks/useLimit";
import { useSynopsis } from "./hooks/useSynopsis";
import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

const LIMIT_MIN = 100;

const Synopsis = ({ children }: Props) => {
  const breakpoint = useBreakpoint();
  const lim = useLimit(breakpoint.breakpointW, LIMIT_MIN);
  const { synopsis, isSynopsis, showReadMore, handleSynopsis } = useSynopsis(
    children,
    lim,
  );

  return (
    <p className={styles.synopsis}>
      {synopsis}{" "}
      {isSynopsis && showReadMore ? (
        <span onClick={handleSynopsis}>Read More</span>
      ) : isSynopsis && !showReadMore ? (
        <span onClick={handleSynopsis}>Read Less</span>
      ) : (
        <></>
      )}
    </p>
  );
};

export { Synopsis };
