import { TTournament } from "../types/tournament"

const fetchTournaments = async(tournament: string)=> {
            let tournaments = null
          await fetch(`${process.env.REACT_APP_API}/api/tournament/queryTournament`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                tournament: tournament,
              }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            tournaments = data.tournaments as TTournament;

          })
          .catch((error) => {
            throw error
          });
          return tournaments;
    
};

export default fetchTournaments;