import { TRound } from "../types/round";
import { TTournament } from "../types/tournament";

const fetchRoundNumber = async(id: string, number: number)=> {
    return new Promise<TRound>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/${id}/${number}`, {
            method: "GET",
            credentials: "include",
            
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.round);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchRoundNumber;