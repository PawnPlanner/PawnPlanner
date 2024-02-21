import {useEffect, useState} from "react";
import { TUser } from "../types/user";
import Session from "../session";
import { useNavigate } from "react-router";
import DeleteAccount from "../services/delete-account";

const SettingsPage = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    
      let navigate = useNavigate();
      useEffect(() => {
        const user = Session.getUser();
        if (user) {
          setEmail(user.email);
        }
      }, [Session.getUser()]);
    
      if (!email) {
        return <div>fetching user</div>;
      }

    return (
        <div className="w-screen h-screen overflow-hidden bg-grey">
            <div className="flex justify-center pt-20">
                <h1 className="text-red text-5xl font-bold">Settings</h1>
            </div>
            
            <div className=" ">
                <button className="text-lgrey text-3xl bg-navy border border-navy rounded-xl p-10 hover:text-red w-72"
                    onClick={() => {
                    navigate("/");
                    window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>
            <div className=" ">
                <button className="text-lgrey text-3xl bg-navy border border-navy rounded-xl p-10 hover:text-red w-72"
                    onClick={async () => {
                        const confirmDelete = window.confirm(
                            "Are you sure you want to delete your account?"
                          );
                          if (confirmDelete) {
                            DeleteAccount(email)
                              .then((res) => {
                                Session.setUser(null);
                                Session.setIsLoggedIn(false);
                                navigate("/auth");
                              })
                          }
                    }}
                >
                    Delete Account
                </button>
            </div>
            
        </div>
    );
};

export default SettingsPage;