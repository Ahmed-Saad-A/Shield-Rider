import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./../App";
import Home from "./Pages/Home/Home";
import Aply from "./Pages/Aply/Aply";
import CarInformation from "./Stepper/CarInformation";
import InsuranceOptions from "./Stepper/InsuranceOptions";
import PersonalInfo from "./Stepper/PersonalInfo";
import ReviewAndSubmit from "./Stepper/ReviewAndSubmit";

let routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "aply",
        element: <Aply />,
        children: [
          { index: true, element: <CarInformation /> },
          { path: "insuranceOptions", element: <InsuranceOptions /> },
          { path: "personalInfo", element: <PersonalInfo /> },
          { path: "reviewAndSubmit", element: <ReviewAndSubmit /> },
        ],
      },
    ],
  },
]);

const Routes = () => {
  return (
    <>
      <RouterProvider router={routing}></RouterProvider>
    </>
  );
};

export default Routes;
