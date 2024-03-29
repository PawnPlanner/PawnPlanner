import { TTournament } from "../types/tournament"

const deleteMatches = async(id: string)=> {
    return new Promise(async (resolve, reject) => {
        try {
            
          await fetch(`${process.env.REACT_APP_API}/api/tournament/deleteMatches`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              id: id
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

export default deleteMatches;