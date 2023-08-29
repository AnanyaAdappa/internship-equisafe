import {
  createContext, useContext, useMemo, useState,
} from 'react';

const StepperContext = createContext({ userData: '', setUserData: null });

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState('');

  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);

  return (
    <StepperContext.Provider value={contextValue}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}
