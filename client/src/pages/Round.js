import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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
  justify-content: center;
`;

const SaveRecipe = styled.div`
//   color: #D90429;
  text-align: center;
  font-weight: bold;
  font-size: 4vh;
  padding: 1vh;
`;

const MatchPairings = styled.div`
//   display: flex;
//   flex-direction: column;
  background-color: #2B2D42;
  color: #edf2f4;
  padding: 1vh;
  font-size: 2vh;
  width: 70vw;
  height: 60vh;
  overflow-y: auto;
  border-radius: 25px;
//   box-shadow: 0 3px 10px 0 #aaa;
`;

// const Rounds = styled(PlayerRegistration)`
// font-size: 3vh;

// `;

const Input = styled.input`
    border-radius: 5px;
    height: 3vh;
    font-size: 2vh;
`;

const Button = styled.button`
    border-radius: 5px;
    height: 4vh;
    font-size: 3vh;
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
        width: 12vw;
        font-size: 4vh;
        text-align: center;
        padding-bottom: 1vh;
        // border-collapse: collapse;
        border-bottom: 1px solid #edf2f4;;
    }
    td {
        text-align: center;
        // border-collapse: collapse;
        // border: 1px solid #d90429;
        padding: 1vh;
        font-size: 3vh;
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



const Round = () => {
  // const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const location = useLocation();
  const [data, setData] = useState(location.state?.data);
  const [rounds, setRounds] = useState([]);
  const [pairings, setPairings] = useState([]);

  // console.log(data);

  const createPairings = (e) => {
    const players = data.players;
    if (pairings.length === 0) {
      if (data.data.pairingSystem === "Swiss") {
        const topHalf = players.slice(0, players.length / 2);
        const bottomHalf = players.slice(players.length / 2);
        // console.log(topHalf)
        // console.log(bottomHalf)
        const newPairings = [];
        for (let i = 0; i < topHalf.length; i++) {
          let newPairing = { player1: topHalf[i], player2: bottomHalf[i], result: "" };
          newPairings.push(newPairing);
          
          // console.log(newPairing)
        }

        if (bottomHalf.length > topHalf.length) {
          let newPairing = { player1: bottomHalf[bottomHalf.length - 1], player2: { name: "bye", rating: "N/A" }, result: "" };
          newPairings.push(newPairing);
        }
        setPairings(newPairings);
      }
      else {
        const newPairings = [];
        if (players.length % 2 === 0) {
          for (let i = 0; i < players.length / 2; i++) {
            const newPairing = { player1: players[i], player2: players[players.length - 1 - i], result: "" };
            newPairings.push(newPairing);
          }
        } else {
          for (let i = 1; i < players.length / 2; i++) {
            const newPairing = { player1: players[i], player2: players[players.length - i], result: "" };
            newPairings.push(newPairing);
          }
          const newPairing = { player1: players[0], player2: { name: "bye", rating: "N/A" }, result: "" };
          newPairings.push(newPairing);
        }
        setPairings(newPairings);
      }
    }
  }

  const clearPairings = (e) => {
    setPairings([]);
  }

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage img src="/img/pawnlogo.png" />
        </AppName>
      </Header>
      <Tournament>
        Round {data && data.index + 1}
        <br></br>
        <div style={{ fontSize: "4vh" }}>
          <Button onClick={createPairings}>
            Create Match Pairings
          </Button>
          &nbsp;
          <Button onClick={clearPairings}>
            Delete All Match Pairings
          </Button>
        </div>
      </Tournament>
      <InnerContainer>
        <MatchPairings>
          <TableRow>
            <thead>
              <th>#</th>
              <th>White</th>
              <th>Rating</th>
              <th>Black</th>
              <th>Rating</th>
              <th>Result</th>
            </thead>
            <tbody>
              {pairings.map((pairing, index) => (
                <TableRow key={index}>
                  <td>{index + 1}</td>
                  {pairing.player1 && <td>{pairing.player1.name}</td>}
                  {pairing.player1 && <td>{pairing.player1.rating}</td>}
                  {pairing.player2 && <td>{pairing.player2.name}</td>}
                  {pairing.player2 && <td>{pairing.player2.rating}</td>}
                  <td><select
                    style={{ color: "black", borderRadius: "5px", height: "3vh", fontSize: "2vh" }}
                  // value={pairingSystem}
                  // onChange={(e) => {
                  //   setResult(e.target.value);

                  // }}
                  >
                    <option disabled selected value>Select Winner</option>
                    <option value="1">White Won</option>
                    <option value="0.5">Draw</option>
                    <option value="-1">Black Won</option>
                    <option value="1F">Bye</option>
                  </select></td>
                </TableRow>
              ))}
            </tbody>
          </TableRow>
        </MatchPairings>
      </InnerContainer >
    </Container >
  )
}

export default Round;