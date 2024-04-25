import { TMatch } from "../types/match";

const fetchMatches = async(id: string)=> {
    return new Promise<TMatch[]>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/player/matches/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.matches);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchMatches;