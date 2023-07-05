import { createContext, useContext } from "react";

const StoreContext = createContext();
export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (typeof context === "undefined")
    throw new Error("useStore must be used within a StoreProvider");
  return context;
};
