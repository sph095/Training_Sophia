import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

function RecipeList() {
  const [search, setSearch] = useState("");
    const navigate = useNavigate();
  const recipes = [
    "Chocolate Mug Cake",
    "Strawberry Shortcake",
    "Banana Bread",
    "French Toast",
    "Butter Fruit Milkshake",
    "Plum Cake",
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Recipe List</h2>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe}>
            <Link
              to="/recipe/$food"
              params={{
                food: recipe.toLowerCase().replaceAll(" ", "-"),
              }}
            >
              {recipe}
            </Link>
          </li>
        ))}
      </ul>
      <br/>
      <button
  onClick={() =>navigate({to: "/favourites",}) }>
  ❤️ Go to Favourites
</button>
    </div>
  );
}

export default RecipeList;