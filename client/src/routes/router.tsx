// import packages
import { useRoutes } from "react-router-dom";

import AuthPage from "../pages/auth-page";
import OnBoardPage from "../pages/onboard-page";
import HomePage from "../pages/home-page";

const Router = () => {
    let element = useRoutes([
        {
            path: "/auth",
            element: <AuthPage />,
        },
        {
            path: "/onboard",
            element: <OnBoardPage />
        },
        {
            path: "/",
            element: <HomePage />,
          },
    ]);
    return element;
  };
  
  export default Router;