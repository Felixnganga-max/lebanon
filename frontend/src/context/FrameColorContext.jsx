import { createContext, useContext, useState } from "react";

const FrameColorContext = createContext({
  color: "transparent",
  setColor: () => {},
});

export function FrameColorProvider({ children }) {
  const [color, setColor] = useState("transparent");
  return (
    <FrameColorContext.Provider value={{ color, setColor }}>
      {children}
    </FrameColorContext.Provider>
  );
}

export function useFrameColor() {
  return useContext(FrameColorContext);
}
