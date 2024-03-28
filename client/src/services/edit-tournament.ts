import { TTournament } from "../types/tournament"

const editTournament = async(tournament: TTournament)=> {
    return new Promise(async (resolve, reject) => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/edit`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              tournament: tournament,
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

export default editTournament;