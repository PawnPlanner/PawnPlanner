import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/navbar";
import CreateNTournament from "../services/create-tournament";
import  {TTournament } from "../types/tournament";
import { async } from "q";
import fetchTournamentByName from "../services/fetch-tournament-by-name";
import { TUser } from "../types/user";
import Session from "../session";
import createRound from "../services/create-round";
import { parseArgs } from "util";



const CreateTournament = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [rounds, setRounds] = useState('0');
  const [pairingSystem, setPairingSystem] = useState('Swiss');
  const [tournament, setTournament] = useState<TTournament>();
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(Session.getUser());
  }, [user]);
 
  if(!user) {
    return(<div>fetching user</div>)
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="h-full bg-lgrey">
        <div className="flex justify-center pt-20" >
          <h1 className="text-5xl font-bold text-red">Create a Tournament</h1>
        </div>
        
        <form className="grid grid-cols-5 pt-12 text-navy">
        <div className="col-span-1 col-start-2 ml-32">

        
        <label>Name</label>
          <br></br>
          <input
            className="px-5 py-1 mt-2 rounded-full"
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              
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
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              
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
             selected={startDate} 
             onChange={
              (date) => setStartDate(date)
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
            value={rounds}
            onChange={(e) => {
              setRounds(e.target.value);
              
            }} />
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
             
            }}>
            <option value="Swiss">Swiss</option>
            <option value="Round-Robin">Round-Robin</option>
          </select>
          <br></br>
          <br></br>
          {name !== "" && location !== "" && rounds !== '0' && <Link
            to="/TournamentInfo:id"
            
          >
            <button className="px-4 py-3 m-10 rounded-full bg-navy text-lgrey hover:text-grey"
            onClick={ async () => {
              await CreateNTournament({
                name: name,
                location: location,
                date: startDate,
                pairingSystem: pairingSystem,
                rounds: rounds,
                owner: user.username,
                currentRound: 1,
              }).then(async () => {
                await fetchTournamentByName(name).then(async (tourn) => {
                  if(tourn._id){
                    for(let i = 1; i <= parseInt(rounds); i++) {
                      await createRound({
                        number: i,
                        
                      }, tourn._id)
                    }
                    setTimeout(() => {
                      navigate(`/TournamentInfo/${tourn._id}`);
                    }, 200)
                  } 
                })
               
              })
            }}
            >
              Create
            </button>
          </Link>}
          </div>
        </form>
      </div>

    </div>
  
  );
};

export default CreateTournament;
