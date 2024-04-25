import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import fetchMatches from "../services/fetch-matches";
import { TMatch } from "../types/match";
import Match from "../components/match";
import fetchPlayerById from "../services/fetch-player";
import { TPlayer } from "../types/player";

const MatchHistoryPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [matches, setMatches] = useState<TMatch[]>()
  const [player, setPlayer] = useState <TPlayer | null>();
  const {name} = useParams();
  useEffect(() => {
    setUser(Session.getUser());
    if(name) {
      fetchMatches(name).then((matches) => {
        setMatches(matches);
      })
      fetchPlayerById(name).then((player) => {
        setPlayer(player);
      })
    }
  }, [user]);
  let navigate = useNavigate();

  if (!user || ! name || !player) {
    return <div>fetching user home</div>;
  }
  if(!matches) {
    return (
      <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="h-full bg-grey">
        <div className="flex justify-center pt-20">
          <h1 className="text-5xl font-bold text-red">Match History for {player.name}</h1>
        </div>
        <div className="flex justify-center mt-4 text-xl text-navy">
            No matches to display yet
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
          <h1 className="text-5xl font-bold text-red">Match History for {player.name}</h1>
        </div>
        <div className="justify-center">
        <div className="grid w-full grid-cols-4 gap-5 p-5">
            {matches
          
            .map((match) => {
                return(
                    <Match
                    match={match}
                    player={player}
                    />
                )
            })}
        </div>
        
       </div>

       
      </div>
    </div>
  );
};

export default MatchHistoryPage;