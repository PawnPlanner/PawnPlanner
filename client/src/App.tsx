import Router from "./routes/router";
import { useEffect, useState } from "react";
import checkLoggedIn from "./services/check-logged-in";
import getUser from "./services/get-user";
import AuthPage from "./pages/auth-page";
import OnBoardPage from "./pages/onboard-page";
import { TUser } from "./types/user";
import Session from "./session";

const App = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [sessionUpdated, setSessionUpdated] = useState<boolean>(false);

  useEffect(() => {
    const updateSession = async () => {
      try {
        await checkLoggedIn().then(async (isLoggedIn) => {
          Session.setIsLoggedIn(isLoggedIn);
          if (isLoggedIn) {
            await getUser().then((userData) => {
              if (userData) {
                Session.setUser(userData);
                setUser(Session.getUser());
                setSessionUpdated(true);
              }
            });
          } else {
            setSessionUpdated(true);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

   

    updateSession();

  }, []);


  if (sessionUpdated) {
    if (user && Session.getIsLoggedIn()) {
      if (!user.onboarded) {
        return <OnBoardPage />;
      } else {
        return <Router />;
      }
    } else {
      return <AuthPage />;
    }
  }

  return (
    <>
      <div>loading</div>
    </>
  );
};

export default App;