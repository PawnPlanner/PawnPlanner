import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";
import { TPlayer } from "../types/player";
import deletePlayer from "../services/delete-player";

interface IPlayerProps {
  player: TPlayer
  id: string
}

const PlayerL = (props: IPlayerProps) => {
    let navigate = useNavigate();

    return (
        <div className="grid w-full grid-cols-4 bg-navy">
            <button className="col-start-1 p-6 text-justify" 
            onClick={() => {
                navigate(`/Round`)
            }}>
                <span className="text-2xl text-grey"> {props.player.name}</span>  
                
            
            </button>
            <span className="col-start-2 mt-6 text-2xl text-justify text-grey">{props.player.rating}</span>
            <span className="col-start-3 mt-6 text-2xl text-justify text-grey">{props.player.points}</span>
            <button className="col-start-4 px-3 mx-1 text-red" onClick={() => {
                                            deletePlayer(props.player, props.id);
                                            
                                        }}>
                                            Remove
                                        </button> 
        </div>
    )
};

export default PlayerL;