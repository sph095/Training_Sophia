import { useParams } from "@tanstack/react-router";
import Favourite from "./Favourite";
import { useNavigate } from "@tanstack/react-router";


  
function Recipe() {
  const { food } = useParams({ from: "/recipe/$food" });
  const navigate = useNavigate();
  // <h1>{food} <Favourite recipeName="Strawberry Shortcake" /></h1>
  if (food === "chocolate-mug-cake") {
    return (
        <div className="min-h-screen bg-orange-50 p-6">
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-orange-600">Chocolate Mug Cake<Favourite recipeName="Chocolate Mug Cake" /></h1>
        
        <div id="steps">
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
  <summary className="font-semibold text-lg cursor-pointer">1. Prepare the Mugs</summary>
  <p className="mt-3 text-gray-700"> Select a microwave-safe mug that holds at least 12 to 16 ounces 
    Lightly grease the inside with cooking spray or a drop of oil.</p>
</details>
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
    <summary className="font-semibold text-lg cursor-pointer">2. Mix the Dry Ingredients</summary>
    <p className="mt-3 text-gray-700">Add the flour, sugar, cocoa powder, baking powder, and salt directly into the mug.</p>
</details>
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
    <summary className="font-semibold text-lg cursor-pointer">3. Add Wet Ingredients</summary>
    <p className="mt-3 text-gray-700">Pour the milk, oil (or melted butter), and vanilla extract into the dry mix. </p>
</details>
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
    <summary className="font-semibold text-lg cursor-pointer">4. Add Mix-Ins (Optional)</summary>
    <p className="mt-3 text-gray-700">If you want a gooey center or a chocolatey crunch, 
    gently drop a small scoop of Nutella or a handful of chocolate chips directly into the center of the batter.
</p>
</details>
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
    <summary className="font-semibold text-lg cursor-pointer">5. Microwave</summary>
    <p className="mt-3 text-gray-700">Place the mug in the center of your microwave. 
    Cook on high power for 60 to 90 seconds (standard 1000-1200W). 
    The cake is done when it puffs up and feels firm but spongy to the touch.
    (If your microwave is under 1000 watts, it may take up to 2 minutes).</p>
</details>
<details className="mb-4 border rounded-lg p-4 bg-orange-50">
    <summary className="font-semibold text-lg cursor-pointer">6. Cool and Enjoy</summary>
    <p className="mt-3 text-gray-700">Let the mug cake cool for 1 to 2 minutes before eating, as it will be very hot. 
    Top it off with a scoop of vanilla ice cream, 
    a dusting of powdered sugar, or eat it straight from the mug!</p>
</details>

</div><br/>

      <button onClick={() => navigate({ to: "/recipeList",})}
         className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
           Back to Recipe List</button>

</div></div></div>

    );
  }
  if (food === "strawberry-shortcake") {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-orange-600">
            Strawberry Shortcake
            <Favourite recipeName="Strawberry Shortcake" />
          </h1>

          <div id="steps">
            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                1. Prepare the Biscuits
              </summary>
              <p className="mt-3 text-gray-700">
                Preheat your oven to 425°F (220°C). In a bowl, whisk together flour, sugar, baking powder, and salt, then cut in cold butter until the mixture looks like coarse crumbs.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                2. Form the Dough
              </summary>
              <p className="mt-3 text-gray-700">
                Stir in cold heavy cream just until the dough comes together. Turn it onto a floured surface, pat into a 1-inch thick round, and cut into biscuit shapes.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                3. Bake the Biscuits
              </summary>
              <p className="mt-3 text-gray-700">
                Place the biscuits on a parchment-lined baking sheet and bake for 12 to 15 minutes, until golden brown on top.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                4. Macerate the Strawberries
              </summary>
              <p className="mt-3 text-gray-700">
                Slice strawberries and toss with sugar. Let them sit for 15 minutes so they release their juices.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                5. Whip the Cream
              </summary>
              <p className="mt-3 text-gray-700">
                Beat heavy cream with sugar and vanilla until soft peaks form.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                6. Assemble and Enjoy
              </summary>
              <p className="mt-3 text-gray-700">
                Split biscuits, add strawberries and whipped cream, then serve.
              </p>
            </details>
          </div>

          <button
            onClick={() => navigate({ to: "/recipeList" })}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Recipe List
          </button>

        </div>
      </div>
    </div>
  );
}
  if (food === "banana-bread") {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-orange-600">
            Banana Bread
            <Favourite recipeName="Banana Bread" />
          </h1>

          <div id="steps">

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                1. Prep the Pan and Oven
              </summary>
              <p className="mt-3 text-gray-700">
                Preheat your oven to 350°F (175°C) and grease a 9x5-inch loaf pan,
                or line it with parchment paper.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                2. Mash the Bananas
              </summary>
              <p className="mt-3 text-gray-700">
                In a large bowl, mash 3 to 4 very ripe bananas with a fork until
                mostly smooth.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                3. Mix the Wet Ingredients
              </summary>
              <p className="mt-3 text-gray-700">
                Stir melted butter, sugar, a beaten egg, and vanilla extract into
                the mashed bananas until well combined.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                4. Add the Dry Ingredients
              </summary>
              <p className="mt-3 text-gray-700">
                Sprinkle baking soda and salt over the mixture and stir in, then
                fold in the flour just until no dry streaks remain. Avoid
                overmixing.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                5. Bake
              </summary>
              <p className="mt-3 text-gray-700">
                Pour the batter into the prepared pan and bake for 55 to 65
                minutes, until a toothpick inserted into the center comes out
                clean or with a few moist crumbs.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                6. Cool and Slice
              </summary>
              <p className="mt-3 text-gray-700">
                Let the loaf cool in the pan for 10 minutes, then transfer to a
                wire rack to cool completely before slicing.
              </p>
            </details>

          </div>

          <button
            onClick={() => navigate({ to: "/recipeList" })}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Recipe List
          </button>

        </div>
      </div>
    </div>
  );
}
 if (food === "french-toast") {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-orange-600">
            French Toast
            <Favourite recipeName="French Toast" />
          </h1>

          <div id="steps">

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                1. Whisk the Custard
              </summary>
              <p className="mt-3 text-gray-700">
                In a shallow dish, whisk together eggs, milk, a splash of vanilla extract,
                and a pinch of cinnamon and salt until fully combined.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                2. Heat the Pan
              </summary>
              <p className="mt-3 text-gray-700">
                Warm a skillet or griddle over medium heat and add a pat of butter,
                swirling until it melts and coats the surface.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                3. Soak the Bread
              </summary>
              <p className="mt-3 text-gray-700">
                Dip slices of slightly stale bread into the egg mixture, letting each
                side soak for a few seconds so it absorbs the custard without falling apart.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                4. Cook the Toast
              </summary>
              <p className="mt-3 text-gray-700">
                Place the soaked bread on the hot skillet and cook for 2 to 3 minutes
                per side, until golden brown and cooked through.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                5. Keep Warm
              </summary>
              <p className="mt-3 text-gray-700">
                If cooking multiple batches, keep finished slices warm on a baking sheet
                in a low oven while you finish the rest.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                6. Serve and Enjoy
              </summary>
              <p className="mt-3 text-gray-700">
                Stack the slices on a plate and top with maple syrup, a dusting of
                powdered sugar, fresh fruit, or a pat of butter.
              </p>
            </details>

          </div>

          <button
            onClick={() => navigate({ to: "/recipeList" })}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Recipe List
          </button>

        </div>
      </div>
    </div>
  );
}
if (food === "butter-fruit-milkshake") {
  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col justify-between items-center mb-6">

          <h1 className="text-4xl font-bold text-orange-600">
            Butter Fruit Milkshake
            <Favourite recipeName="Butter Fruit Milkshake" />
          </h1>

          <div id="steps">

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                1. Prep the Avocado
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                Cut a ripe avocado (butter fruit) in half, remove the pit,
                and scoop the flesh into a blender.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                2. Add the Liquids
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                Pour in cold milk and add a few ice cubes to the blender
                along with the avocado.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                3. Sweeten the Shake
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                Add sugar or condensed milk to taste, along with a splash
                of vanilla extract if desired.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                4. Blend Until Smooth
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                Blend on high speed for 30 to 60 seconds, until the mixture
                is completely smooth and creamy with no chunks remaining.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                5. Check the Consistency
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                If the shake is too thick, add a little more milk and blend
                again briefly to reach your preferred consistency.
              </p>
            </details>

            <details className="mb-4 border rounded-lg p-4 bg-orange-50">
              <summary className="font-semibold text-lg cursor-pointer">
                6. Serve Chilled
              </summary>
              <p className="mt-3 text-gray-700 break-words">
                Pour into a tall glass and serve immediately, optionally
                topped with a sprinkle of nuts or a drizzle of chocolate syrup.
              </p>
            </details>

          </div>

          <button
            onClick={() => navigate({ to: "/recipeList" })}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Recipe List
          </button>

        </div>
      </div>
    </div>
  );
}
  return (
  <div className="min-h-screen bg-orange-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Recipe not found
      </h1>

      <button
        onClick={() => navigate({ to: "/recipeList" })}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
      >
        Back to Recipe List
      </button>
    </div>
  </div>
);
  
  
  
  return (
    <div>
      <h1>Recipe not found</h1>;
      <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>
    </div>
  )
  
}
export default Recipe;


// import { useParams } from "@tanstack/react-router";
// import Favourite from "./Favourite";
// import { useNavigate } from "@tanstack/react-router";


  
// function Recipe() {
//   const { food } = useParams({ from: "/recipe/$food" });
//   const navigate = useNavigate();
//   // <h1>{food} <Favourite recipeName="Strawberry Shortcake" /></h1>
//   if (food === "chocolate-mug-cake") {
//     return (
//       <div>
//         <h1>Chocolate Mug Cake<Favourite recipeName="Chocolate Mug Cake" /></h1>
        
//         <div id="steps">
// <details>
//   <summary>1. Prepare the Mugs</summary>
//   <p> Select a microwave-safe mug that holds at least 12 to 16 ounces 
//     Lightly grease the inside with cooking spray or a drop of oil.</p>
// </details>
// <details>
//     <summary>2. Mix the Dry Ingredients</summary>
//     <p>Add the flour, sugar, cocoa powder, baking powder, and salt directly into the mug.</p>
// </details>
// <details>
//     <summary>3. Add Wet Ingredients</summary>
//     <p>Pour the milk, oil (or melted butter), and vanilla extract into the dry mix. </p>
// </details>
// <details>
//     <summary>4. Add Mix-Ins (Optional)</summary>
//     <p>If you want a gooey center or a chocolatey crunch, 
//     gently drop a small scoop of Nutella or a handful of chocolate chips directly into the center of the batter.
// </p>
// </details>
// <details>
//     <summary>5. Microwave</summary>
//     <p>Place the mug in the center of your microwave. 
//     Cook on high power for 60 to 90 seconds (standard 1000-1200W). 
//     The cake is done when it puffs up and feels firm but spongy to the touch.
//     (If your microwave is under 1000 watts, it may take up to 2 minutes).</p>
// </details>
// <details>
//     <summary>6. Cool and Enjoy</summary>
//     <p>Let the mug cake cool for 1 to 2 minutes before eating, as it will be very hot. 
//     Top it off with a scoop of vanilla ice cream, 
//     a dusting of powdered sugar, or eat it straight from the mug!</p>
// </details>

// </div><br/>

//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>

// </div>

//     );
//   }
//   if (food === "strawberry-shortcake") {
//     return (
//           <div>
//         <h1>Strawberry Shortcake<Favourite recipeName="Strawberry Shortcake" /></h1>
//         <div id="steps">
// <details>
//   <summary>1. Prepare the Biscuits</summary>
//   <p>Preheat your oven to 425°F (220°C). In a bowl, whisk together flour, sugar, baking powder, and salt, then cut in cold butter until the mixture looks like coarse crumbs.</p>
// </details>
// <details>
//     <summary>2. Form the Dough</summary>
//     <p>Stir in cold heavy cream just until the dough comes together. Turn it onto a floured surface, pat into a 1-inch thick round, and cut into biscuit shapes.</p>
// </details>
// <details>
//     <summary>3. Bake the Biscuits</summary>
//     <p>Place the biscuits on a parchment-lined baking sheet and bake for 12 to 15 minutes, until golden brown on top. Let them cool slightly on a wire rack.</p>
// </details>
// <details>
//     <summary>4. Macerate the Strawberries</summary>
//     <p>While the biscuits bake, slice fresh strawberries and toss them with a few tablespoons of sugar. Let them sit for at least 15 minutes so they release their juices into a light syrup.</p>
// </details>
// <details>
//     <summary>5. Whip the Cream</summary>
//     <p>Beat heavy cream with a spoonful of sugar and a splash of vanilla extract until soft peaks form.</p>
// </details>
// <details>
//     <summary>6. Assemble and Enjoy</summary>
//     <p>Split each biscuit in half, spoon strawberries and their juice over the bottom half, add a dollop of whipped cream, and top with the other half. Finish with more berries and cream.</p>
// </details>
// </div><br/>
//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>

// </div>
//       );
//   }
//   if (food === "banana-bread") {
//     return (
//         <div>
//         <h1>Banana Bread<Favourite recipeName="Banana Bread" /></h1>
//         <div id="steps">
// <details>
//   <summary>1. Prep the Pan and Oven</summary>
//   <p>Preheat your oven to 350°F (175°C) and grease a 9x5-inch loaf pan, or line it with parchment paper.</p>
// </details>
// <details>
//     <summary>2. Mash the Bananas</summary>
//     <p>In a large bowl, mash 3 to 4 very ripe bananas with a fork until mostly smooth.</p>
// </details>
// <details>
//     <summary>3. Mix the Wet Ingredients</summary>
//     <p>Stir melted butter, sugar, a beaten egg, and vanilla extract into the mashed bananas until well combined.</p>
// </details>
// <details>
//     <summary>4. Add the Dry Ingredients</summary>
//     <p>Sprinkle baking soda and salt over the mixture and stir in, then fold in the flour just until no dry streaks remain. Avoid overmixing.</p>
// </details>
// <details>
//     <summary>5. Bake</summary>
//     <p>Pour the batter into the prepared pan and bake for 55 to 65 minutes, until a toothpick inserted into the center comes out clean or with a few moist crumbs.</p>
// </details>
// <details>
//     <summary>6. Cool and Slice</summary>
//     <p>Let the loaf cool in the pan for 10 minutes, then transfer to a wire rack to cool completely before slicing.</p>
// </details>
// </div><br/>
//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>

// </div>
//       );
//   }
//   if (food === "french-toast") {
//     return (
//         <div>
//         <h1>French Toast<Favourite recipeName="French Toast" /></h1>
//         <div id="steps">
// <details>
//   <summary>1. Whisk the Custard</summary>
//   <p>In a shallow dish, whisk together eggs, milk, a splash of vanilla extract, and a pinch of cinnamon and salt until fully combined.</p>
// </details>
// <details>
//     <summary>2. Heat the Pan</summary>
//     <p>Warm a skillet or griddle over medium heat and add a pat of butter, swirling until it melts and coats the surface.</p>
// </details>
// <details>
//     <summary>3. Soak the Bread</summary>
//     <p>Dip slices of slightly stale bread into the egg mixture, letting each side soak for a few seconds so it absorbs the custard without falling apart.</p>
// </details>
// <details>
//     <summary>4. Cook the Toast</summary>
//     <p>Place the soaked bread on the hot skillet and cook for 2 to 3 minutes per side, until golden brown and cooked through.</p>
// </details>
// <details>
//     <summary>5. Keep Warm</summary>
//     <p>If cooking multiple batches, keep finished slices warm on a baking sheet in a low oven while you finish the rest.</p>
// </details>
// <details>
//     <summary>6. Serve and Enjoy</summary>
//     <p>Stack the slices on a plate and top with maple syrup, a dusting of powdered sugar, fresh fruit, or a pat of butter.</p>
// </details>
// </div><br/>
//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>

// </div>
//       );
//   }
//   if (food === "butter-fruit-milkshake") {
//     return (
//         <div>
//         <h1>Butter Fruit Milkshake<Favourite recipeName="Butter Fruit Milkshake" /></h1>
//         <div id="steps">
// <details>
//   <summary>1. Prep the Avocado</summary>
//   <p>Cut a ripe avocado (butter fruit) in half, remove the pit, and scoop the flesh into a blender.</p>
// </details>
// <details>
//     <summary>2. Add the Liquids</summary>
//     <p>Pour in cold milk and add a few ice cubes to the blender along with the avocado.</p>
// </details>
// <details>
//     <summary>3. Sweeten the Shake</summary>
//     <p>Add sugar or condensed milk to taste, along with a splash of vanilla extract if desired.</p>
// </details>
// <details>
//     <summary>4. Blend Until Smooth</summary>
//     <p>Blend on high speed for 30 to 60 seconds, until the mixture is completely smooth and creamy with no chunks remaining.</p>
// </details>
// <details>
//     <summary>5. Check the Consistency</summary>
//     <p>If the shake is too thick, add a little more milk and blend again briefly to reach your preferred consistency.</p>
// </details>
// <details>
//     <summary>6. Serve Chilled</summary>
//     <p>Pour into a tall glass and serve immediately, optionally topped with a sprinkle of nuts or a drizzle of chocolate syrup.</p>
// </details>
// </div><br/>
//        <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>
// </div>
//       );
//   }
//   if (food === "plum-cake") {
//     return (
//           <div>
//         <h1>Plum Cake<Favourite recipeName="Plum Cake" /></h1>
//         <div id="steps">
// <details>
//   <summary>1. Prep the Oven and Pan</summary>
//   <p>Preheat your oven to 350°F (175°C) and grease an 8 or 9-inch round or square cake pan, or line it with parchment paper.</p>
// </details>
// <details>
//     <summary>2. Prepare the Plums</summary>
//     <p>Wash and halve fresh plums, removing the pits. Slice them into wedges if you'd like more pieces distributed through the batter.</p>
// </details>
// <details>
//     <summary>3. Cream the Butter and Sugar</summary>
//     <p>In a large bowl, beat softened butter and sugar together until light and fluffy, about 2 to 3 minutes.</p>
// </details>
// <details>
//     <summary>4. Add the Wet Ingredients</summary>
//     <p>Beat in eggs one at a time, then mix in vanilla extract and a splash of milk or yogurt until smooth.</p>
// </details>
// <details>
//     <summary>5. Fold in the Dry Ingredients</summary>
//     <p>Sift together flour, baking powder, and salt, then gently fold into the batter just until combined. Avoid overmixing.</p>
// </details>
// <details>
//     <summary>6. Arrange the Plums</summary>
//     <p>Pour the batter into the prepared pan and smooth the top. Arrange the plum wedges over the surface, skin side up, pressing them in slightly.</p>
// </details>
// <details>
//     <summary>7. Bake</summary>
//     <p>Bake for 40 to 50 minutes, until the cake is golden and a toothpick inserted into the center comes out clean.</p>
// </details>
// <details>
//     <summary>8. Cool and Serve</summary>
//     <p>Let the cake cool in the pan for 10 to 15 minutes before transferring to a wire rack. Dust with powdered sugar before serving, if desired.</p>
// </details>
// </div><br/>
//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>

// </div>
//       );
//   }
  
//   return (
//     <div>
//       <h1>Recipe not found</h1>;
//       <button onClick={() => navigate({ to: "/recipeList",})}> Back to Recipe List</button>
//     </div>
//   )
  
// }
// export default Recipe;