import { TRound } from "../types/round";
import { TTournament } from "../types/tournament";

const fetchRounds = async(id: string)=> {
    return new Promise<TRound[]>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/rounds/${id}`, {
            method: "GET",
            credentials: "include",
            
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.rounds);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchRounds;