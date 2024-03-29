import { TMatch } from "../types/match";
import { TPlayer } from "../types/player";

const addPoints = async (player: TPlayer, points: number, id: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await fetch(`${process.env.REACT_APP_API}/api/tournament/addPoints`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    player: player,
                    points: points,
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

export default addPoints;