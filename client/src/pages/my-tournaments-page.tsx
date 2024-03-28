import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import fetchMyTournaments from "../services/fetch-my-tournaments";
import Tournament from "../components/tourney";

const MyTournamentPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [tournaments, setTournaments] = useState<TTournament[]>();

  useEffect(() => {
    setUser(Session.getUser());
    if(user) {
        fetchMyTournaments(user.username).then((tournaments) => {
            setTournaments(tournaments);
        });
    }
  }, [user]);
  let navigate = useNavigate();

  useEffect(() => {
   
  }, [])

  if (!user) {
    return <div>fetching user home</div>;
  }
  if( !tournaments) {
    return(
        <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="h-full bg-grey">
          <div className="flex justify-center pt-20">
            <h1 className="text-5xl font-bold text-red">My Tournaments</h1>
          </div>
          <div className="flex justify-center">
          <h3 className="text-3xl text-navy"> No tournaments to display yet</h3>
          </div>
       
          
        </div>
      </div> 
    )
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="h-full bg-grey">
        <div className="flex justify-center pt-20">
          <h1 className="text-5xl font-bold text-red">My Tournaments</h1>
        </div>
       <div className="justify-center">
        <div className="grid w-full grid-cols-4 gap-5 p-5">
            {tournaments
          
            .map((tournament) => {
                return(
                    <Tournament
                    user={user}
                    tournament={tournament}
                    />
                )
            })}
        </div>
        
       </div>
        
      </div>
    </div>
  );
};

export default MyTournamentPage;