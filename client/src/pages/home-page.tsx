import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  useEffect(() => {
    setUser(Session.getUser());
  }, [user]);
  let navigate = useNavigate();

  if (!user) {
    return <div>fetching user home</div>;
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="bg-grey h-full">
        <div className="flex justify-center pt-20">
          <h1 className="text-red text-5xl font-bold">Start Playing Today!</h1>
        </div>
        <div className=" flex flex-row justify-evenly mt-36">
          <button className="text-lgrey text-3xl bg-navy border border-navy rounded-xl p-10 hover:text-red w-72"
            onClick={() => {
              navigate("/CreateTournament");
              window.location.reload();
            }}
          >
            Create a Tournament
          </button>
          <button className="text-lgrey text-3xl bg-navy border border-navy rounded-xl hover:text-red w-72"
            onClick={() => {
              navigate("/Settings");
              window.location.reload();
            }}
          >
            Settings
          </button>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;