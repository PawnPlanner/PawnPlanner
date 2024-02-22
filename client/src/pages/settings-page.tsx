import {useEffect, useState} from "react";
import { TUser } from "../types/user";
import Session from "../session";
import { useNavigate } from "react-router";
import DeleteAccount from "../services/delete-account";
import handleSignout from "../services/handle-sign-out";
import AdjustName from "../services/adjust-name";
import getUser from "../services/get-user";

const SettingsPage = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
    const [givenName, setGivenName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [familyName, setFamilyName] = useState<string>("");
    
    let navigate = useNavigate();
    useEffect(() => {
        const user = Session.getUser();
        setUser(user);
        if (user) {
          setEmail(user.email);
          setUsername(user.username);
          setGivenName(user.givenName);
          setFamilyName(user.familyName);
        }
    }, [Session.getUser()]);
    const handleSave = async () => {
        try {
          await AdjustName(username, givenName, middleName, familyName);
          Session.setUser(await getUser());
        } catch (err) {
          console.error(err);
        }
      };
    
      if (!email) {
        return <div>fetching user</div>;
      }


    return (
        <div className="w-screen h-screen overflow-hidden bg-grey">
            <div className="flex justify-center pt-20">
                <h1 className="text-red text-5xl font-bold">Settings</h1>
            </div>
    <div className="mt-32 w-full h-full flex justify-center">
            
            <div className="flex h-1/2 ml-10 w-32">
                <form
                className="p-10 border-navy rounded-xl border-4 text-2xl"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                >
                    <div className="font-semibold">Username:</div>
                    <input
                    className="border-b-2 outline-none border-b-lgrey mb-2"
                    type="text"
                    placeholder="Enter User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="font-semibold">First name:</div>
                    <input
                    className="border-b-2 outline-none border-b-lgrey mb-2"
                    type="text"
                    placeholder="Enter Given Name"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                    />
                    <div className="font-semibold">Middle Name:</div>
                    <input
                    className="border-b-2 outline-none border-b-lgrey mb-2"
                    type="text"
                    placeholder="Enter Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <div className="font-semibold">Last Name:</div>
                    <input
                    className="border-b-2 outline-none border-b-lgrey mb-2"
                    type="text"
                    placeholder="Enter Last Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    />
                    <div className="mt-2">
                    <button
                        className="px-2 py-1 border-2 border-navy rounded-xl hover:bg-navy hover:text-lgrey"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    </div>
                </form>
            </div>
            <div className="ml-56 mr-5">
                <button className="text-lgrey text-l bg-navy border border-navy rounded-xl p-2 hover:text-red w-24"
                    onClick={async () => {
                        const confirmLogout = window.confirm(
                            "Are you sure you want to logout?"
                          );
                          if (confirmLogout) {
                            handleSignout()
                              .then((res) => {
                                Session.setUser(null);
                                Session.setIsLoggedIn(false);
                                navigate("/auth");
                              })
                          }
                    }}
                >
                    Logout
                </button>
            </div>
            <div className="">
                <button className="text-lgrey text-l bg-navy border border-navy rounded-xl p-2 hover:text-red w-48"
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
        </div>
        
    );
};

export default SettingsPage;