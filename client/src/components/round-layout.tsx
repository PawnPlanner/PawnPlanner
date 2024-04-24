import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";
import { TRound } from "../types/round";
import fetchRoundNumber from "../services/fetch-round-number";
import Session from "../session";


interface IRoundProps {
    number: number,
    round: TRound,
    tournament: TTournament,
}

const RoundL = (props: IRoundProps) => {
    let navigate = useNavigate();
    let currentUser = Session.getUser();
    // console.log(props.round);
    if(!currentUser) {
        return(
            <div>fetching current user</div>
        )
    }
    return (
        <div className="w-full bg-navy">
            <div className="w-full bg-navy">
            <span className="text-justify ml-5 text-2xl text-[#edf2f4]"> Round {props.number + 1}</span>
            <button className="float-right mr-5 text-[#d90249]"
                onClick={() => {
                    navigate(`/Round/${props.round}`)
                }}>
                {currentUser.username == props.tournament.owner  ? (<div>Edit</div>) : (<div>View</div>)}
                

            </button>
        </div>
        </div>
    )
};

export default RoundL;