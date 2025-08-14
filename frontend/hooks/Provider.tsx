"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextProps {
  currentAccount: string;
  setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useProvider = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useProvider must be used within Provider");
  return context;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) setCurrentAccount(saved);
  }, []);

  return (
    <AppContext.Provider value={{ currentAccount, setCurrentAccount }}>
      {children}
    </AppContext.Provider>
  );
};