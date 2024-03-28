import { TTournament } from "../types/tournament"

const fetchTournamentByName = async(name: string)=> {
    return new Promise<TTournament>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/fetchName/${name}`, {
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

export default fetchTournamentByName;