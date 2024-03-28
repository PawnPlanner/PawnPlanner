import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { TTournament } from "../types/tournament";
import { TPlayer } from "../types/player";
import { parse } from "path";
import fetchTournamentById from "../services/fetch-tournament-id";
import addPlayer from "../services/add-player";
import deletePlayer from "../services/delete-player";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size:5vh;
`;
const Header = styled.div`
  background-color: #2B2D42;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  height:20vh;
//   font-size: 25px;
//   font-weight: bold;
//   box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  // display: flex;
  // flex-direction: row;
  // padding: 10px 10px;
  // border-radius: 6px;
  // margin-left: 20px;
  // width: 50%;
  // background-color: white;
`;
const SearchIcon = styled.img`
  width: 5vh;
  height: 5vh;
`;
const RecipeImage = styled.img`
//   width: height * 2.3;
  height: 10vh;
  margin: 15px;
`;
const Placeholder = styled.img`
  width: height * 2.3;
  height: 60vh;
  margin: 5vh;
  margin-bottom: 10vh;
  opacity: 50%;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 5vh;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
//   flex-wrap: wrap;
  height:75vh;
//   background: #B7BFCC;
background: #edf2f4;
  padding: 30px;
  gap: 10vw;
//   justify-content: space-evenly;
`;

const SaveRecipe = styled.div`
//   color: #D90429;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  padding: 1vh;
`;

const PlayerRegistration = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2B2D42;
  color: #edf2f4;
  padding: 10px;
  font-size: 2vh;
  width: 25vw;
  height: 70vh;
  overflow-y: auto;
//   box-shadow: 0 3px 10px 0 #aaa;
`;

const Rounds = styled(PlayerRegistration)`
font-size: 3vh;

`;

const Input = styled.input`
    border-radius: 5px;
    height: 3vh;
    font-size: 2vh;
    color:black;
`;

const Button = styled.button`
    border-radius: 5px;
    height: 3vh;
    font-size: 2vh;
`;

const Edit = styled(Button)`
float: right;
color: #d90249;
height: 4vh;
font-size: 3vh;
// background: #edf2f4;
`;

const TableRow = styled.tr`
    th {
        // height: 3vh;
        width: 9.25vw;
        // font-size: 3vh;
        text-align: center;
        border-collapse: collapse;
        border: 1px solid #d90429;
    }
    td {
        text-align: center;
        border-collapse: collapse;
        border: 1px solid #d90429;
        font-size: 2vh;
    }
`;

const Tournament = styled.div`
  color: #D90429;
  text-align: center;
  font-size: 8vh;
  font-weight: bold;
  //   background: #B7BFCC;
background: #edf2f4;
//   padding-top: 1vh;
`;

const Info = styled.div`
    font-size: 3vh;
`;

const ScrollBar = styled.div`
    overflow-y: auto;
`;



const TournamentInfo = () => {
    const [players, setPlayers] = useState<TPlayer[] | []>([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const location = useLocation();
    const [tournament, setTournament] = useState<TTournament | null>(null);
    const { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        if (id) {
            fetchTournamentById(id).then((tournament) => {
                setTournament(tournament);
                if (tournament.players) {
                    setPlayers(tournament.players);
                }

            })
        }
    }, [])
    if (!tournament) {
        return <div>fetching tournament</div>
    }
    if (!id) {
        return <div>fetching tournament</div>
    }

    return (
        <Container>
            <Navbar />
            <Tournament>

                {tournament.name}
                <br></br>

                <Info>
                    Location: {tournament.location} | Date: {tournament.date ? new Date(tournament.date).toLocaleDateString() : ""}
                    <br></br>
                    Rounds: {tournament.rounds} | Pairing System: {tournament.pairingSystem}
                    <br />
                    <button className="w-12 text-base rounded-full font-large bg-navy text-lgrey"
                        onClick={() => navigate(`/edit/${id}`)}>
                        edit
                    </button>
                </Info>

            </Tournament>

            <InnerContainer>
                <PlayerRegistration>
                    {/* <ScrollBar> */}
                    <SaveRecipe>
                        Player Registration
                    </SaveRecipe>
                    <form>
                        <label>Name&nbsp;</label>
                        <Input
                            type="text"
                            // placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Input>
                        <br></br>
                        <label>Rating</label>
                        <Input
                            type="number"
                            // placeholder="Rating"
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                        </Input>
                        &nbsp;
                        <button className="px-5 py-0.5 mx-3 rounded-md bg-red"
                            onClick={async (e) => {
                                e.preventDefault();
                                await addPlayer({
                                    name: name,
                                    rating: parseInt(rating),
                                    points: 0,
                                }, id)
                            }}>
                            Add player
                        </button>

                    </form>
                    <br></br>
                    <TableRow>
                        <thead>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Points</th>
                            <th>Options</th>
                        </thead>
                        <tbody>
                            {players
                                .sort((a, b) => {
                                    if (a.points == b.points) {
                                        return b.rating - a.rating;
                                    }
                                    return b.points - a.points;
                                })
                                .map((player, index) => (
                                    <TableRow key={index}>
                                        <td>{player.name}</td>
                                        <td>{player.rating}</td>
                                        <td>{player.points}</td>
                                        {
                                        }
                                        <td><Button onClick={() => deletePlayer(player, id)}>Remove</Button></td>
                                    </TableRow>
                                ))}
                        </tbody>
                    </TableRow>
                    {/* </ScrollBar> */}
                </PlayerRegistration>

                <Rounds>
                    {/* <ScrollBar> */}
                    <SaveRecipe>
                        Rounds
                    </SaveRecipe>
                    {Array.from({ length: parseInt(tournament.rounds) }).map(
                        (element, index) =>
                            <p>
                                Round {index + 1}
                                {players && <Link
                                    to="/Round"
                                    state={{ data: { index, players } }}
                                >
                                    <Edit>
                                        Edit
                                    </Edit>
                                </Link>}

                            </p>
                    )}
                    {/* </ScrollBar> */}
                </Rounds>
            </InnerContainer>
        </Container>
    )
}

export default TournamentInfo;
