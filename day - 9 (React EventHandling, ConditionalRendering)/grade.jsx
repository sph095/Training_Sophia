import { useState } from "react";

function FindGrade() {
  const [mark, setMark] = useState("");

  const numMark = Number(mark);

  let grade = "";

  if (numMark === 100) {
    grade = "O";
  } else if (numMark >= 90) {
    grade = "A+";
  } else if (numMark >= 80) {
    grade = "A";
  } else if (numMark >= 70) {
    grade = "B+";
  } else if (numMark >= 60) {
    grade = "B";
  } else if (mark !== "") {
    grade = "C";
  }

  return (
    <div>
      <input
        type="number"
        placeholder="Enter your mark"
        value={mark}
        onChange={(e) => setMark(e.target.value)}
      />

      {grade && <h1>You got {grade} grade</h1>}
    </div>
  );
}

export default FindGrade;