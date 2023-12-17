import { useEffect, useState } from "react";

const useFilter = (
  swiper: any,
  thumbsSwiper: any,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    setFilter(localStorage.getItem("isNSFWActive") === "true" ? true : false);
  }, []);

  useEffect(() => {
    if (swiper && thumbsSwiper) {
      localStorage.setItem("isNSFWActive", filter ? "true" : "false");
      swiper.update();
      thumbsSwiper.update();
      swiper?.slideTo(0);
      thumbsSwiper?.slideTo(0);
    }
  }, [filter]);

  return [filter, setFilter];
};

export { useFilter };
