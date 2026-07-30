import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function ShowFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavourites: string[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    setFavourites(savedFavourites);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-orange-600 text-center mb-8">
          ❤️ My Favourite Recipes
        </h1>

        {favourites.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg">
              No favourite recipes yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col text-center gap-4">
            {favourites.map((recipe) => (
              <div
                key={recipe}
              >
                
  <Link
    to="/recipe/$food"
    params={{
      food: recipe.toLowerCase().replaceAll(" ", "-"),
    }}
  className="block bg-orange-50 border border-orange-200 rounded-xl p-4 shadow-sm hover:shadow-md">
  ❤️ {recipe}
</Link>
                
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ShowFavourites;


// import { useEffect, useState } from "react";

// function ShowFavourites() {
//   const [favourites, setFavourites] = useState<string[]>([]);

//   useEffect(() => {
//     const savedFavourites: string[] = JSON.parse(
//       localStorage.getItem("favourites") || "[]"
//     );

//     setFavourites(savedFavourites);
//   }, []);

//   return (
//     <div>
//       <h2>❤️ My Favourite Recipes</h2>

//       {favourites.length === 0 ? (
//         <p>No favourite recipes yet.</p>
//       ) : (
//         <ul>
//           {favourites.map((recipe) => (
//             <li key={recipe}>{recipe}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ShowFavourites;