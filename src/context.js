import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  const value = { dark ,setDark};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;