import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<TUser | null>(null);


  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="">
      
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;