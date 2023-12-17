import { useEffect, useState } from "react";

const useLimit = (breakpoint: string, lim: number): number => {
  const [limit, setLimit] = useState(lim);

  useEffect(() => {
    switch (breakpoint) {
      case "sm":
        setLimit(100);
        break;
      case "md":
        setLimit(1000);
        break;
      case "lg":
        setLimit(1100);
        break;
      case "xl":
        setLimit(1200);
        break;
      case "2xl":
        setLimit(1500);
        break;
    }
  }, [breakpoint]);

  return limit;
};

export { useLimit };
