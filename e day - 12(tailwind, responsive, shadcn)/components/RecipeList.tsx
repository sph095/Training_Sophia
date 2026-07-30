import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Favourite from "./Favourite";
import { Button } from "./ui/button";

import chocolateImg from "../assets/chocolateImg.png";
import strawberryImg from "../assets/strawberryImg.png";
import bananaImg from "../assets/bananaImg.png";
import frenchToastImg from "../assets/frenchToastImg.png";
import milkshakeImg from "../assets/milkshakeImg.png";
import plumCakeImg from "../assets/plumCakeImg.jpg";

function RecipeList() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const recipes = [
    {
      name: "Chocolate Mug Cake",
      image: chocolateImg,
    },
    {
      name: "Strawberry Shortcake",
      image: strawberryImg,
    },
    {
      name: "Banana Bread",
      image: bananaImg,
    },
    {
      name: "French Toast",
      image: frenchToastImg,
    },
    {
      name: "Butter Fruit Milkshake",
      image: milkshakeImg,
    },
    {
      name: "Plum Cake",
      image: plumCakeImg,
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
           Recipe Finder
        </h1>

        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>

                <div className="flex justify-between items-center mt-auto">
                  <Button className="bg-orange-500 hover:bg-orange-600">
  <Link
    to="/recipe/$food"
    params={{
      food: recipe.name.toLowerCase().replaceAll(" ", "-"),
    }}
  >
    View Recipe
  </Link>
</Button>

     <Favourite recipeName={recipe.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Go to Favourites Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate({ to: "/favourites" })}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            ❤️ Go to Favourites
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;


// import { useState } from "react";
// import { Link, useNavigate } from "@tanstack/react-router";
// import Favourite from "./Favourite";

// import chocolateImg from "../assets/chocolateImg.png";
// import strawberryImg from "../assets/strawberryImg.png";
// import bananaImg from "../assets/bananaImg.png";
// import frenchToastImg from "../assets/frenchToastImg.png";
// import milkshakeImg from "../assets/milkshakeImg.png";
// import plumCakeImg from "../assets/plumCakeImg.jpg";

// function RecipeList() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const recipes = [
//   {
//     name: "Chocolate Mug Cake",
//     image: chocolateImg,
//   },
//   {
//     name: "Strawberry Shortcake",
//     image: strawberryImg,
//   },
//   {
//     name: "Banana Bread",
//     image: bananaImg,
//   },
//   {
//     name: "French Toast",
//     image: frenchToastImg,
//   },
//   {
//     name: "Butter Fruit Milkshake",
//     image: milkshakeImg,
//   },
//   {
//     name: "Plum Cake",
//     image: plumCakeImg,
//   },
// ];

//   const filteredRecipes = recipes.filter((recipe) =>
//     recipe.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-orange-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
//           🍳 Recipe Finder
//         </h1>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search recipes..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-3 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />

//         {/* Recipe Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           {filteredRecipes.map((recipe) => (
//             <div
//               key={recipe.name}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
//             >
//               <div className="w-full h-56 overflow-hidden">
//                 <img
//                   src={recipe.image}
//                   alt={recipe.name}
//                   className="w-full h-full object-cover object-center"
//                 />
//               </div>

//               <div className="p-4 flex flex-col flex-grow">
//                 <h2 className="text-xl font-semibold mb-4">{recipe.name}</h2>

//                 <div className="flex justify-between items-center mt-auto">
//                   <Link
//                     to="/recipe/$food"
//                     params={{
//                       food: recipe.name.toLowerCase().replaceAll(" ", "-"),
//                     }}
//                     className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//                   >
//                     View Recipe
//                   </Link>

//                   <Favourite recipeName={recipe.name} />
//                 </div>
//               </div>
//             </div>
//           ))}
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecipeList;