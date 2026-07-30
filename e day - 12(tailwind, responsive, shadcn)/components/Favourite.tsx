import { useEffect, useState } from "react";

type FavouriteProps = {
  recipeName: string;
};

function Favourite({ recipeName }: FavouriteProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourites: string[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    setIsFavourite(favourites.includes(recipeName));
  }, [recipeName]);

  const toggleFavourite = () => {
    const favourites: string[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    let updated: string[];

    if (favourites.includes(recipeName)) {
      updated = favourites.filter((item) => item !== recipeName);
      setIsFavourite(false);
    } else {
      updated = [...favourites, recipeName];
      setIsFavourite(true);
    }

    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggleFavourite}
      className="
        text-3xl
        transition-transform
        duration-200
        hover:scale-125
        cursor-pointer
      "
    >
      {isFavourite ? "❤️" : "🤍"}
    </button>
  );
}

export default Favourite;


// import { useEffect, useState } from "react";

// // interface FavouriteProps {
// //   recipeName: string;
// // }
// type FavouriteProps = {
//   recipeName: string;
// };

// function Favourite({ recipeName }: FavouriteProps) {
//   const [isFavourite, setIsFavourite] = useState(false);

//   useEffect(() => {
//     const favourites: string[] = JSON.parse(
//       localStorage.getItem("favourites") || "[]"
//     );

//     setIsFavourite(favourites.includes(recipeName));
//   }, [recipeName]);

//   const toggleFavourite = () => {
//     const favourites: string[] = JSON.parse(
//       localStorage.getItem("favourites") || "[]"
//     );

//     let updated: string[];

//     if (favourites.includes(recipeName)) {
//       updated = favourites.filter((item) => item !== recipeName);
//       setIsFavourite(false);
//     } else {
//       updated = [...favourites, recipeName];
//       setIsFavourite(true);
//     }

//     localStorage.setItem("favourites", JSON.stringify(updated));
//   };

//   return (
//     <button onClick={toggleFavourite}>
//       {isFavourite ? "❤️" : "🤍"}
//     </button>
//   );
// }

// export default Favourite;
