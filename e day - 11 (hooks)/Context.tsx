import { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

function Context() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          padding: "20px",
          border: "2px solid black",
          margin: "20px",
        }}
      >
        <Toolbar />

        <br />

        <button
          onClick={() =>
            setTheme(theme === "light" ? "dark" : "light")
          }
        >
          Toggle Theme
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <Button />;
}

function Button() {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#000000" : "#ffffff",
        padding: "10px 20px",
        border: "1px solid black",
      }}
    >
      I am styled by {theme} theme
    </button>
  );
}

export default Context;