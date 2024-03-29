import { TRound } from "../types/round";

const createRound = async(round: TRound, id:string )=> {
    return new Promise(async (resolve, reject) => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/newRound`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              round: round,
              Id: id,
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

export default createRound;