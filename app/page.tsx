"use client";

import { HeroImg } from "./features/HeroImg";
import { Loader } from "./features/Loader";
import { Main } from "./features/Home";
import { Fullpage } from "./libs/fullpage";
import { ToastContainer } from "react-toastify";
import { More } from "./features/More";
import { Gallery } from "./features/Gallery";
import { Episodes } from "./features/Episodes";
import { Voices } from "./features/Voices";
import { useOnline } from "./hooks/useOnline";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  useOnline();

  return (
    <>
      <Loader />
      <HeroImg>
        <Fullpage>
          <div className="section">
            <Main />
          </div>
          <div className="section">
            <More />
          </div>
          <div className="section">
            <Gallery />
          </div>
          <div className="section">
            <Episodes />
          </div>
          <div className="section">
            <Voices />
          </div>
        </Fullpage>
      </HeroImg>
      <ToastContainer />
    </>
  );
}
