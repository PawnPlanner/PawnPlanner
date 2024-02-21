// import packages
import { useRoutes } from "react-router-dom";

import AuthPage from "../pages/auth-page";
import OnBoardPage from "../pages/onboard-page";
import HomePage from "../pages/home-page";
import CreateTournament from "../pages/CreateTournament";
import TournamentInfo from "../pages/TournamentInfo"

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
        {
            path: "/TournamentInfo",
            element: <TournamentInfo />,
        },
        {
            path: "/CreateTournament",
            element: <CreateTournament />,
        },
    ]);
    return element;
};

export default Router;
