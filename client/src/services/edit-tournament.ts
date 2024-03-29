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
          }).then(() => {
            
              resolve(true);
           
          });
        } catch (err) {
          
          reject(false);
        }
      });
};

export default editTournament;