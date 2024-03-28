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
import getUser from "../services/get-user";
import deleteTournament from "../services/delete-tournament";

const EditPage = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [tournament, setTournament] = useState<TTournament | null>(null);
    const [location, setLocation] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [rounds, setRounds] = useState<string>();
    const [pairingSystem, setPairingSystem] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    useEffect(() => {
        setUser(Session.getUser());
      }, [user]);
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
            setLocation(tourn.location);
            setName(tourn.name);
            setPairingSystem(tourn.pairingSystem);
            setDate(tourn.date);
            setRounds(tourn.rounds);
        };
    
   }
   setter();
  }, [])
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
            
        <div className="grid grid-cols-5 pt-12 text-navy">
        <div className="col-span-1 col-start-2 ml-32">

        
        <label>Name</label>
          <br></br>
          <input
            className="px-5 py-1 mt-2 rounded-full"
            type="text"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
              
            }}
            defaultValue={tournament.name}
          />
          <br></br>
          <br></br>
          <label>Location</label>
          <br></br>
          <input
            className="px-5 py-1 mt-2 rounded-full"
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              
            }}
            defaultValue={tournament.location}
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
             selected={date}
             onChange={
              (date) => setDate(date)
              } />
          </div>
          </div>
          <div className="col-span-1 col-start-4">
          <label>Number of rounds</label>
          <br></br>
          <input
           className="px-5 py-1 mt-2 rounded-full"
            type="number"
            min="0"
            value={rounds}
            onChange={(e) => {
              setRounds(e.target.value);
              
            }} 
            defaultValue={tournament.rounds}/>
          <br></br>
          <br></br>
          <label>Pairing System
          </label>
          <br></br>
          <select
             className="px-5 py-1 mt-2 rounded-full"
            value={pairingSystem}
            onChange={(e) => {
             setPairingSystem(e.target.value);
             
            }}
            defaultValue={tournament.pairingSystem}>
            <option value="Swiss">Swiss</option>
            <option value="Round-Robin">Round-Robin</option>
          </select>
          <br></br>
          <br></br>
         
            <button className="px-4 py-3 m-10 rounded-full bg-navy text-lgrey hover:text-grey"
            onClick={ async () => {
             await editTournament({
                _id: tournament._id,
                name: tournament.name,
                location: tournament.location,
                date: tournament.date,
                rounds: tournament.rounds,
                pairingSystem: tournament.pairingSystem,
                players: tournament.players,
                owner: user.username,
              })
              .then (async(res) => {
                setTimeout(() => {
                    navigate(`/TournamentInfo/${id}`)
                  }, 1500);
                  Session.setUser(await getUser());
              }).catch((err) => {

              });
              
            }}
            >
              Save
            </button>
            <button className="px-4 py-3 rounded-full bg-lred text-lgrey hover:text-grey"
            onClick={async () => {
                await deleteTournament({
                    _id: tournament._id,
                    name: tournament.name,
                    location: tournament.location,
                    date: tournament.date,
                    rounds: tournament.rounds,
                    pairingSystem: tournament.pairingSystem,
                    players: tournament.players,
                    owner: user.username,
                })
                .then( async() => {
                    navigate('/');
                })
            } }>
                Delete Tournament 
            </button>
          
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default EditPage;