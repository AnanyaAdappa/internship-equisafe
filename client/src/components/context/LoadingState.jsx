import { createContext, useMemo, useState } from "react";

export const loadingContext = createContext();

export default function LoadingState({ children }) {
  const [progress, setProgress] = useState(0);

  //   To optimize performance and prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      progress,
      setProgress,
    }),
    [progress]
  );
  return (
    <loadingContext.Provider value={contextValue}>
      {children}
    </loadingContext.Provider>
  );
}
