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
    player: TPlayer;
}

const Match = (props: IMatchProps) => {
    const [player1, setPlayer1] = useState(false);
    useEffect(() => {
        if(props.player.name == props.match.player1.name) {
            setPlayer1(true);
        }
    })

    return (
        <div className="w-full px-4 py-4 rounded-lg context-center bg-navy drop-shadow-md">
            
                  {player1 ? (<span className="text-3xl text-grey">Opponent: {props.match.player2.name}</span>)
                  : <span className="text-3xl text-grey">Opponent: {props.match.player1.name}</span>}
                  <br></br>
                <span className="text-2xl text-lgrey">Result: {props.match.result}</span>
            
        </div>
    )
};

export default Match;