import { TTournament } from "../types/tournament"

const fetchTournamentsByPlayerId = async(id: string)=> {
    return new Promise<TTournament[]>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/myTournaments/player/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.tournaments);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchTournamentsByPlayerId;