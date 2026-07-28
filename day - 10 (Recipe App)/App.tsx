// import { useState } from 'react'
import './App.css'

import { RouterProvider } from "@tanstack/react-router";
import router from "./Route";

function App() {
  return <RouterProvider router={router} />;
  // return (
  //   <>
  //     <Profile/>
  //     <RecipeList/>
  //     <Recipe/>

  //   </>
  // )
}

export default App

