import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";

const MatchHistoryPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const {name} = useParams();
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
      <div className="h-full bg-grey">
        <div className="flex justify-center pt-20">
          <h1 className="text-5xl font-bold text-red">Match History for {name}</h1>
        </div>
        <div className="flex justify-center mt-4 text-xl text-navy">
            No matches to display yet
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryPage;