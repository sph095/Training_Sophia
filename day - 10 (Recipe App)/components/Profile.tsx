import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

function Profile() {
  const [uname, setUname] = useState("");
  const [ubio, setUbio] = useState("");
  const [submitted, setSubmitted] = useState(false);
//
  const navigate = useNavigate();
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
    // const profileIn = document.getElementById("profileInput");
    // profileIn.style.display = "none";

  const nextPage = () => {
    setSubmitted(true);
    //
    navigate({
    to: "/recipeList",
  });
    };

  return (
    <div>
      <h1>Profile</h1>
      {!submitted && (
  <div id="profileInput">
      <input
        type="text"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
        placeholder="Enter your name"
        id="name"
        style={{ width: "200px", marginTop:"100px" , fontSize:"20px"}}
      /><br /><br />

      <textarea
        value={ubio}
        onChange={(e) => setUbio(e.target.value)}
        placeholder="Write your bio"
        id="bio"
        style={{ width: "200px", fontSize:"20px" }}
      /><br /><br />

      <button onClick={handleSubmit} style={{ width: "100px" , fontSize:"20px"}}>
        Submit
      </button><br />
      </div>
      
)}
    <div>
        {submitted && (
        <div style={{margin:"10% 40% ", fontSize:"20px", minWidth:"200px",maxWidth:"400px", padding:"50px", textAlign:"left", border:"1px solid black" }}>
          <p>Hi {uname}!</p><br/> <br/>
          <button onClick={nextPage} style={{ width: "200px", fontSize:"20px" }}>See Recipe List</button>
        </div>
      )}
      </div>
      </div>

      
    
  );
}

export default Profile;