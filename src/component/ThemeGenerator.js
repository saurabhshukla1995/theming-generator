// ThemeGenerator.jsx
import { useState, useEffect } from "react";
import chroma from "chroma-js";

export default function ThemeGenerator() {
  const [primary, setPrimary] = useState("#3498db");
  const [secondary, setSecondary] = useState("#e74c3c");
  const [theme, setTheme] = useState({});

  // Generate theme whenever colors change
  useEffect(() => {
    const newTheme = {
      primary,
      secondary,
      primaryLight: chroma(primary).brighten(1).hex(),
      primaryDark: chroma(primary).darken(1).hex(),
      secondaryLight: chroma(secondary).brighten(1).hex(),
      secondaryDark: chroma(secondary).darken(1).hex(),
      textOnPrimary: chroma.contrast(primary, "white") > 4.5 ? "#fff" : "#000",
      textOnSecondary: chroma.contrast(secondary, "white") > 4.5 ? "#fff" : "#000",
      primaryScale: chroma.scale([chroma(primary).darken(2), primary]).mode("lab").colors(5),
      secondaryScale: chroma.scale([chroma(secondary).darken(2), secondary]).mode("lab").colors(5),
    };
    setTheme(newTheme);
  }, [primary, secondary]);

  const exportTheme = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(theme, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "theme.json");
    dlAnchor.click();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Dynamic Theme Generator</h1>

      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <div>
          <label>Primary Color:</label><br />
          <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} />
        </div>
        <div>
          <label>Secondary Color:</label><br />
          <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Preview Buttons</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button style={{
            backgroundColor: theme.primary,
            color: theme.textOnPrimary,
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>Primary Button</button>

          <button style={{
            backgroundColor: theme.secondary,
            color: theme.textOnSecondary,
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>Secondary Button</button>
        </div>

        <h2 style={{ marginTop: "2rem" }}>Color Scales</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {theme.primaryScale?.map((color, idx) => (
            <div key={idx} style={{ backgroundColor: color, width: "50px", height: "50px", borderRadius: "4px" }}></div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
          {theme.secondaryScale?.map((color, idx) => (
            <div key={idx} style={{ backgroundColor: color, width: "50px", height: "50px", borderRadius: "4px" }}></div>
          ))}
        </div>

        <button 
          onClick={exportTheme} 
          style={{
            marginTop: "2rem",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#2c3e50",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Export Theme
        </button>
      </div>
    </div>
  );
}