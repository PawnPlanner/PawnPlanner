import { TMatch } from "../types/match";
import { TRound } from "../types/round";

const createMatch = async(match: TMatch, id: string)=> {
    return new Promise(async (resolve, reject) => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/newMatch`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              match: match,
              id: id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.status == 201) {
              resolve(true);
            } else reject(false);
          });
        } catch (err) {
          console.error(err);
          reject(false);
        }
      });
};

export default createMatch;