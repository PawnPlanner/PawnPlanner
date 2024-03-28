import { TTournament } from "../types/tournament"

const fetchMyTournaments = async(user: string)=> {
    return new Promise<TTournament[]>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/myTournaments/${user}`, {
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

export default fetchMyTournaments;