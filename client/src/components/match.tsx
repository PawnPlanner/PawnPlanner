import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";
import { TMatch } from "../types/match";
import { TPlayer } from "../types/player";
import { useEffect, useState } from "react";
import fetchPlayerById from "../services/fetch-player";
import { match } from "assert";



interface IMatchProps {
    match: TMatch;
}

const Match = (props: IMatchProps) => {
    let navigate = useNavigate();
    const [player1, setPlayer1] = useState<TPlayer | null>(null);
    useEffect(() => {
        fetchPlayerById(props.match.player1).then((player1) => {
            setPlayer1(player1);
        })
    })
    if(!player1) {
        return (
            <div></div>
        )
    }

    return (
        <div className="w-full rounded-lg bg-navy drop-shadow-md">
            
                  
                <span className="text- 2xl text-grey">{player1.name}</span>
            
        </div>
    )
};

export default Match;