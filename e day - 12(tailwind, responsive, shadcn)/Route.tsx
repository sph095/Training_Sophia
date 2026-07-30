import { createRootRoute, createRoute,
  createRouter, Outlet} from "@tanstack/react-router";
import Profile from './components/Profile';
import RecipeList from "./components/RecipeList";
import Recipe from './components/Recipe';
import ShowFavourites from './components/ShowFavourites';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Profile,
});
const recipeListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipeList",
  component: RecipeList,
});
// const recipeRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/recipe",
//   component: Recipe,
// });
// const recipeRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/recipe/$food",
//   component: Recipe,
// });
//ivaruku bathil ini ivar
const recipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipe/$food",
  component: Recipe,
});

const favouritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favourites",
  component: ShowFavourites,
});
const routeTree = rootRoute.addChildren([
  profileRoute,
  recipeListRoute,
  recipeRoute,
  favouritesRoute,
]);

const router = createRouter({
  routeTree,
});
export default router;




