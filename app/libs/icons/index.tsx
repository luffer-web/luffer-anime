import { FaSearch } from "react-icons/fa";
import {
  FiVolumeX,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { CgDanger } from "react-icons/cg";

type Props = {
  icon: string;
};

const Icons = ({ icon }: Props) => {
  switch (icon) {
    case "search":
      return <FaSearch />;
    case "mute":
      return <FiVolumeX />;
    case "low":
      return <FiVolume />;
    case "mid":
      return <FiVolume1 />;
    case "high":
      return <FiVolume2 />;
    case "previous":
      return <FiChevronLeft />;
    case "first":
      return <FiChevronsLeft />;
    case "next":
      return <FiChevronRight />;
    case "last":
      return <FiChevronsRight />;
    case "danger":
      return <CgDanger />;
  }
};

export { Icons };
