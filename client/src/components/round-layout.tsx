import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";
import { TRound } from "../types/round";


interface IRoundProps {
  round:TRound
}

const RoundL = (props: IRoundProps) => {
    let navigate = useNavigate();

    return (
        <div className="w-full bg-navy">
            <button className="grid grid-flow-row p-6 text-justify" 
            onClick={() => {
                navigate(`/Round/${props.round._id}`)
            }}>
                <span className="mr-5 text-2xl text-lred"> Round {props.round.number}</span>   
            
            </button>
        </div>
    )
};

export default RoundL;