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
                <div className="flex space-x-7">
                    <div>
                        <a href="/" className="flex items-center px-6 py-4">
                            <img className="w-2/5" src="/img/pawnlogo.png" />
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