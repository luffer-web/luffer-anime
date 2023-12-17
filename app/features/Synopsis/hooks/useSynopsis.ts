import { useLayoutEffect, useState } from "react";

type Synopsis = {
  synopsis: string;
  isSynopsis: boolean;
  showReadMore: boolean;
  handleSynopsis: () => void;
};

const useSynopsis = (children: React.ReactNode, lim: number): Synopsis => {
  const [synopsis, setSynopsis] = useState(children as string);
  const [isSynopsis, setIsSynopsis] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const handleSynopsis = () => {
    showReadMore
      ? setSynopsis(children as string)
      : setSynopsis((children as string)?.slice(0, lim) + "...");
    setShowReadMore((old) => !old);
  };

  useLayoutEffect(() => {
    if ((children as string)?.length > lim) {
      setSynopsis((children as string)?.slice(0, lim) + "...");
      setIsSynopsis(true);
      setShowReadMore(true);
    } else {
      setSynopsis(children as string);
    }

    return;
  }, [children, lim]);

  return { synopsis, isSynopsis, showReadMore, handleSynopsis };
};

export { useSynopsis };
