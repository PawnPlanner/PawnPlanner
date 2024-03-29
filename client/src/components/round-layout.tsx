import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";
import { TRound } from "../types/round";


interface IRoundProps {
  round:TRound,
  tournament:TTournament,
}

const RoundL = (props: IRoundProps) => {
    let navigate = useNavigate();

    return (
        <div className="w-full bg-navy">
            <button className="grid grid-flow-row p-6 text-justify" 
            onClick={() => {
                navigate(`/Round/${props.tournament._id}`)
            }}>
                <span className="mr-5 text-2xl text-lred"> Round </span>   
                <span>{props.round.number}</span>
            
            </button>
        </div>
    )
};

export default RoundL;