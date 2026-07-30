import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

function Profile() {
  const [uname, setUname] = useState("");
  // const [ubio, setUbio] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateName = (value: string) => {
    if (!/^[A-Za-z\s]*$/.test(value)) {
      setError("Only letters and spaces allowed");
    } else {
      setError("");
    }

    setUname(value);
  };

  const handleSubmit = () => {
    if (uname.trim() === "") {
      setError("Please enter your name");
      return;
    }

    if (error) {
      return;
    }

    setSubmitted(true);
  };

  const nextPage = () => {
    navigate({
      to: "/recipeList",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center p-6">
      {!submitted ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
             Profile
          </h1>

          <input
            type="text"
            value={uname}
            onChange={(e) => validateName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-4 border rounded-3xl focus:outline-none  focus:ring-2 focus:ring-orange-400 mb-10"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2 mb-4">
              {error}
            </p>
          )}

          {/* <textarea
            value={ubio}
            onChange={(e) => setUbio(e.target.value)}
            placeholder="Write your bio"
            rows={4}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          /> */}

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Welcome!
          </h2>

          <p className="text-lg text-gray-700 mb-6">
            Hi <span className="font-semibold">{uname}</span> 
          </p>

          <button
            onClick={nextPage}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            See Recipe List
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;

// import { useState } from "react";
// import { useNavigate } from "@tanstack/react-router";

// function Profile() {
//   const [uname, setUname] = useState("");
//   const [ubio, setUbio] = useState("");
//   const [submitted, setSubmitted] = useState(false);
// //
//   const navigate = useNavigate();
//   const handleSubmit = () => {
//     setSubmitted(true);
//   };

//   const nextPage = () => {
//     setSubmitted(true);
//     //
//     navigate({
//     to: "/recipeList",
//   });
//     };

//   return (
//     <div className="min-h-screen bg-blue-500"> 
//       <h1>Profile</h1>
//       {!submitted && (
//   <div id="profileInput">
//       <input 
//         type="text"
//         value={uname}
//         onChange={(e) => setUname(e.target.value)}
//         placeholder="Enter your name"
//         id="name"
//         style={{ width: "200px", marginTop:"100px" , fontSize:"20px"}}
//       /><br /><br />

//       <textarea
//         value={ubio}
//         onChange={(e) => setUbio(e.target.value)}
//         placeholder="Write your bio"
//         id="bio"
//         style={{ width: "200px", fontSize:"20px" }}
//       /><br /><br />

//       <button onClick={handleSubmit} style={{ width: "100px" , fontSize:"20px"}}>
//         Submit
//       </button><br />
//       </div>
      
// )}
//     <div>
//         {submitted && (
//         <div style={{margin:"10% 40% ", fontSize:"20px", minWidth:"200px",maxWidth:"400px", padding:"50px", textAlign:"left", border:"1px solid black" }}>
//           <p>Hi {uname}!</p><br/> <br/>
//           <button onClick={nextPage} style={{ width: "200px", fontSize:"20px" }}>See Recipe List</button>
//         </div>
//       )}
//       </div>
//       </div>

      
    
//   );
// }

// export default Profile;