import { TPlayer } from "../types/player";

const byeSignup = async(player: TPlayer, id: string)=> {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
          await fetch(`${process.env.REACT_APP_API}/api/tournament/bye`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              player: player,
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

export default byeSignup;