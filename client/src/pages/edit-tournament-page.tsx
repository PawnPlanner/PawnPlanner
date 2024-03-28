import { TUser } from "../types/user";
import Session from "../session";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { TTournament } from "../types/tournament";
import fetchTournamentById from "../services/fetch-tournament-id";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import editTournament from "../services/edit-tournament";


const EditPage = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [tournament, setTournament] = useState<TTournament | null>(null);
  const [name, setName] = useState(tournament?.name);
  const [location, setLocation] = useState(tournament?.location);
  const [startDate, setStartDate] = useState(tournament?.date);
  const [rounds, setRounds] = useState(tournament?.rounds);
  const [pairingSystem, setPairingSystem] = useState(tournament?.pairingSystem);

  const {id} = useParams()
  useEffect(() => {
    setUser(Session.getUser());
  }, [user]);
  let navigate = useNavigate();

 
  useEffect(() => {
    const setter = async () => {
        if(id) {
            const tourn = await fetchTournamentById(id);
            setTournament(tourn);
        };
    
   }
   setter();
  }, [tournament])
  if (!user) {
    return <div>fetching user home</div>;
  }
  if(!id) {
    return <div>fetching tournament</div>
  }
  if(!tournament) {
    return <div> fetching tournament</div>
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="h-full bg-grey">
        <div className="flex justify-center pt-20">
          <h1 className="text-5xl font-bold text-red">Edit Your Tournament</h1>
        </div>
            
        <form className="grid grid-cols-5 pt-12 text-navy">
        <div className="col-span-1 col-start-2 ml-32">

        
        <label>Name</label>
          <br></br>
          <input
            className="px-5 py-1 mt-2 rounded-full"
            type="text"
            required
            placeholder={tournament.name}
            onChange={(e) => {
                tournament.name = e.target.value;
              
            }}
          />
          <br></br>
          <br></br>
          <label>Location</label>
          <br></br>
          <input
            className="px-5 py-1 mt-2 rounded-full"
            type="text"
            required
            placeholder={tournament.location}
            onChange={(e) => {
              tournament.location = e.target.value;
              
            }}
          ></input>
          <br></br>
          <br></br>
          <label>Date</label>
          <br></br>
          <div style={{
            borderRadius: "5px",
            height: "3vh",
            fontSize: "2vh"
          }}>
            <DatePicker
             className="px-5 py-1 mt-2 rounded-full"
             
             onChange={
              (date) => tournament.date = date
              } />
          </div>
          </div>
          <div className="col-span-1 col-start-4">
          <label>Number of rounds</label>
          <br></br>
          <input
           className="px-5 py-1 mt-2 rounded-full"
            type="number"
            required
            min="0"
            value={tournament.rounds}
            onChange={(e) => {
              tournament.rounds = e.target.value;
              
            }} />
          <br></br>
          <br></br>
          <label>Pairing System
          </label>
          <br></br>
          <select
             className="px-5 py-1 mt-2 rounded-full"
            
            onChange={(e) => {
             
             
            }}>
            <option value="Swiss">Swiss</option>
            <option value="Round-Robin">Round-Robin</option>
          </select>
          <br></br>
          <br></br>
         
            <button className="px-4 py-3 m-10 rounded-full bg-navy text-lgrey hover:text-grey"
            onClick={ async () => {
              editTournament(tournament);
              navigate(`TournamentInfo/${id}`)
            }}
            >
              Save
            </button>
          
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default EditPage;