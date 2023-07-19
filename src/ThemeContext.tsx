import React, { createContext, useState } from "react";
type ThemeContextProviderProps = {
  children: React.ReactNode;
};
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<string>("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
