import { TPlayer } from "../types/player";

const fetchPlayerById = async(id: string)=> {
    return new Promise<TPlayer>(async (resolve, reject) => {
          await fetch(`${process.env.REACT_APP_API}/api/player/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(async (res) => {
            return res.json();
          }).then((data) => {
            resolve(data.player as TPlayer);
          })
          .catch((error) => {
            reject(error);
          });
    });
};

export default fetchPlayerById;