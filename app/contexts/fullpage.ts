import { createContext } from "react";
import { fullpageApi } from "@fullpage/react-fullpage";

const FullpageContext = createContext<null | fullpageApi>(null);

export { FullpageContext };
