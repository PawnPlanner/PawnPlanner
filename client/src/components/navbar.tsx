import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import handleSignout from "../services/handle-sign-out";
import Session from "../session";
import { TUser } from "../types/user";
import { useEffect } from "react";



const Navbar = () => {
    const [user, setUser] = useState<TUser | null>(null);
    useEffect(() => {
      setUser(Session.getUser());
    }, [user]);
  
    if (!user) {
      return <div>fetching user home</div>;
    }

  return (
    <nav className="h-24 bg-navy">
        <div className="w-screen mx-auto">
            <div className="flex justify-between">
                <div className="flex justify-between space-x-48">
                    <div>
                        <a href="#" className="flex items-center w-full px-6 py-4">
                            <a href="/">
                            <img className="w-72" src="/img/pawnlogo.png" />
                            </a>
                        </a>
                    </div>
                    
                    <div className="items-center hidden space-x-1 lg:flex">
                        <a href="/search" className="text-2xl text-lgrey hover:text-grey">
                            Search
                        </a>
                    </div>
                    <div className="items-center hidden space-x-1 lg:flex">
                        <a href="/myTournaments" className="text-2xl text-lgrey hover:text-grey">
                            My Tournaments
                        </a>
                    </div> 
                    <div className="items-center hidden space-x-1 lg:flex">
                        <a href="/createTournament" className="text-2xl text-lgrey hover:text-grey">
                            Create Tournament
                        </a>
                    </div>
                    <div className="">
                        <a href="/settings" className="">
                            <img className="absolute h-16 rounded-full right-6 top-5" src={user.profileImgUrl} referrerPolicy="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
  
    </nav>
  );
};

export default Navbar;