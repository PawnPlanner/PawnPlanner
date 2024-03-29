import { TTournament } from "../types/tournament"

const fetchTournamentByRoundId = async(id: string)=> {
    return new Promise<TTournament>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/round/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.tournament as TTournament);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchTournamentByRoundId;