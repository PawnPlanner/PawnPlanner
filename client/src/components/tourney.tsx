import { useNavigate } from "react-router-dom";
import { TTournament } from "../types/tournament";
import { TUser } from "../types/user";


interface ITourneyProps {
    tournament: TTournament;
    user: TUser;
}

const Tournament = (props: ITourneyProps) => {
    let navigate = useNavigate();

    return (
        <div className="w-full rounded-lg bg-navy drop-shadow-md">
            <button className="grid grid-flow-row p-6 text-justify" 
            onClick={() => {
                navigate(`/TournamentInfo/${props.tournament._id}`)
            }}>
                <span className="mr-5 text-4xl text-lred">{props.tournament.name}</span>   
                <span className="text- 2xl text-grey">{props.tournament.location}</span>
            </button>
        </div>
    )
};

export default Tournament;