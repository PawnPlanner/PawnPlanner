import { TUser } from "./types/user";

const Session = (function () {
  let user: TUser | null = null;
  let isLoggedIn: Boolean = false;
  const getUser = () => {
    return user;
  };

  const setUser = (u: TUser | null) => {
    user = u;
  };



  const getIsLoggedIn = () => {
    return isLoggedIn;
  };

  const setIsLoggedIn = (i: Boolean) => {
    isLoggedIn = i;
  };

  return {
    getUser: getUser,
    setUser: setUser,
    getIsLoggedIn: getIsLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  };
})();

export default Session;