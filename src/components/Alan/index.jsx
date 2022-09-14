import React, { useContext, useEffect } from "react";

import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { fetchToken } from "../../utils";
import { Logout } from "../Profile";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  useEffect(() => {
    alanBtn({
      key: "7edb97b3ebc648f3747c86bfc6ee35732e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode }) => {
        console.log(command, mode);
        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          Logout();
        }
      },
    });
  }, []);
  return <div>Alan</div>;
};

export default useAlan;
