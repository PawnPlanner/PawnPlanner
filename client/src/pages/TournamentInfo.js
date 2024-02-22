import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

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
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const location = useLocation();
    const [data, setData] = useState(location.state?.data);
    const [rounds, setRounds] = useState([]);

    const addPlayer = (e) => {
        e.preventDefault();
        if (name !== "" && rating !== "") {
            const newPlayer = { name: name, rating: rating, points: 0 };
            setPlayers([...players, newPlayer]);
            // console.log(players);
            // const sorted = players;
            // // console.log(sorted);
            // const sortedPlayers = sorted.sort((a, b) => (a.rating > b.rating) ? 1 : -1);

            // setPlayers(sortedPlayers);
            // console.log(sortedPlayers);
        }
        // setName("");
        // setRating("");

    }

    const removePlayer = (removed) => {
        const newPlayers = players.filter(player => player !== removed);
        setPlayers(newPlayers);
    }

    return (
        <Container>
            <Navbar />
            <Tournament>
                {data && data.name}
                <br></br>
                <Info>
                    Location: {data && data.location} | Date: {data && data.date.toLocaleDateString()}
                    <br></br>
                    Rounds: {data && data.rounds} | Pairing System: {data && data.pairingSystem}
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
                        <Button
                            onClick={addPlayer}>
                            Add player
                        </Button>
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
                                        <td><Button onClick={() => removePlayer(player)}>Remove</Button></td>
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
                    {data && Array.from({ length: data.rounds }).map(
                        (element, index) =>
                            <p>
                                Round {index + 1}
                                {players && <Link
                                    to="/Round"
                                    state={{ data: {index, players, data} }}
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
