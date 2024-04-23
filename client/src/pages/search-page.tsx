import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import SearchTournament from "../components/search-tournament";

const SearchPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  useEffect(() => {
    setUser(Session.getUser());
  }, [user]);
  let navigate = useNavigate();

  if (!user) {
    return <div>fetching user home</div>;
  }

  return (
    <div className="fixed w-screen h-screen bg-grey">
      <Navbar />
     
      <div className="text-center translate-y-1/3">
        
        <h1 className="text-5xl font-bold text-red">Find Tournaments!</h1>
        <SearchTournament />
        
        
      </div>
     
        
    </div>
  );
};

export default SearchPage;