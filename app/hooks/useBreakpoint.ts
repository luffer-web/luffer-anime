import { useEffect, useRef, useState, useCallback } from "react";

type BreakpointW = "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointH = "sm" | "md" | "xl";
type Screen = {
  breakpointW: BreakpointW;
  breakpointH: BreakpointH;
  height: number;
  width: number;
};

const useBreakpoint = (): Screen => {
  const [breakpointW, setBreakpointW] = useState<BreakpointW>("sm");
  const [breakpointH, setBreakpointH] = useState<BreakpointH>("sm");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const timeoutIDRef = useRef<NodeJS.Timeout>();

  const getBreakpoint = () => {
    if (window.innerWidth >= 1536) {
      setBreakpointW("2xl");
    } else if (window.innerWidth >= 1280) {
      setBreakpointW("xl");
    } else if (window.innerWidth >= 1024) {
      setBreakpointW("lg");
    } else if (window.innerWidth >= 768) {
      setBreakpointW("md");
    } else {
      setBreakpointW("sm");
    }

    if (window.innerHeight >= 800) {
      setBreakpointH("xl");
    } else if (window.innerHeight >= 600) {
      setBreakpointH("md");
    } else {
      setBreakpointH("sm");
    }

    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  const debounce = useCallback((cb: typeof getBreakpoint, wait: number) => {
    clearTimeout(timeoutIDRef.current);
    timeoutIDRef.current = setTimeout(cb, wait);
  }, []);

  useEffect(() => {
    getBreakpoint();
    window.addEventListener("resize", () => debounce(getBreakpoint, 1000));

    return () => {
      window.removeEventListener("resize", getBreakpoint);
    };
  }, [debounce]);

  return { breakpointW, breakpointH, height, width };
};

export { useBreakpoint };
export type { Screen };
