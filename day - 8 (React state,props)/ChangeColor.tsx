import { useState } from "react";

function ChangeColor() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <div
        style={{
          width: "400px",
          height: "150px",
          
          backgroundColor: color,
        }}
      >
        <p>Click button to change colour</p>
      </div>

      <button
        onClick={() =>
          setColor(color === "red" ? "green" : "red")
        }
      >
        Change Colour
      </button>
    </div>
  );
}

export default ChangeColor;