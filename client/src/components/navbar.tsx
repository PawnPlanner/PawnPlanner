import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import handleSignout from "../services/handle-sign-out";
import Session from "../session";





const Navbar = () => {

  return (
    <nav className="shadow-lg bg-navy">
        <div className="w-screen mx-auto">
            <div className="flex justify-between">
                <div className=" flex space-x-7">
                    <div>
                        <a href="#" className="flex items-center px-2 py-4">
                            <a className="text-lg font-semibold text-red" href="/">
                            Pawn Planner
                            </a>
                        </a>
                    </div>
                </div>
            </div>
        </div>
  
    </nav>
  );
};

export default Navbar;