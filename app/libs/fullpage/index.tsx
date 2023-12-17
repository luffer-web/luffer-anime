import React from "react";
import { FullpageContext } from "@/app/contexts/fullpage";
import ReactFullpage from "@fullpage/react-fullpage";

type Props = {
  children: React.ReactNode;
};

const Fullpage = ({ children }: Props): React.JSX.Element => {
  return (
    <ReactFullpage
      licenseKey="gplv3-license"
      credits={{
        enabled: false,
        label: "Made with fullPage.js",
        position: "left",
      }}
      scrollingSpeed={1000}
      render={({ state: _state, fullpageApi }) => {
        return (
          <ReactFullpage.Wrapper>
            <FullpageContext.Provider value={fullpageApi}>
              {children}
            </FullpageContext.Provider>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export { Fullpage };
