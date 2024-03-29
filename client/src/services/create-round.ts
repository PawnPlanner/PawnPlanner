import { TRound } from "../types/round";

const createRound = async(round: TRound)=> {
    return new Promise(async (resolve, reject) => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/newRound`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              round: round,
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