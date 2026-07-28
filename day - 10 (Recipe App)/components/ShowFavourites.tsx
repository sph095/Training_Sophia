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
    <div>
      <h2>❤️ My Favourite Recipes</h2>

      {favourites.length === 0 ? (
        <p>No favourite recipes yet.</p>
      ) : (
        <ul>
          {favourites.map((recipe) => (
            <li key={recipe}>{recipe}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShowFavourites;