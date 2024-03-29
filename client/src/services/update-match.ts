import { TMatch } from "../types/match";
import { TPlayer } from "../types/player";

const updateMatch = async (match: TMatch, result: string, id: string) => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            await fetch(`${process.env.REACT_APP_API}/api/tournament/updateMatchResult`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    match: match,
                    result: result,
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

export default updateMatch;