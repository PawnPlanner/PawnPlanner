import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import fetchTournamentById from "../services/fetch-tournament-id";
import fetchRoundById from "../services/fetch-round-id";
import { TTournament } from "../types/tournament";
import { TMatch } from "../types/match";
import { TPlayer } from "../types/player";
import createMatch from "../services/create-match";
import fetchTournamentByRoundId from "../services/fetch-tournament-by-round-id";
import deletePlayer from "../services/delete-player";
import deleteMatches from "../services/delete-matches";
import { TRound } from "../types/round";
import updateMatch from "../services/update-match";

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



const Rounds = () => {
  const [players, setPlayers] = useState<TPlayer[] | []>([]);
  const [tournament, setTournament] = useState<TTournament | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const location = useLocation();
  const [data, setData] = useState(location.state?.data);
  const [rounds, setRounds] = useState([]);
  const [pairingSystem, setPairingSystem] = useState("");
  const [pairings, setPairings] = useState<TMatch[] | null>(null);
  const [match, setMatch] = useState<TMatch | null>(null);
  const { id } = useParams();
  const [round, setRound] = useState<TRound>();
  const [bye, setBye] = useState<TPlayer[] | []>([]);
  const [noBye, setNoBye] = useState<TPlayer[] | []>([]);

  // console.log(data);

  const tournamentPlayers = async () => {
    if (id) {
      await fetchTournamentByRoundId(id).then((tournament) => {
        setTournament(tournament);
        if (tournament && tournament.players) {
          setPlayers(tournament.players);
          if (players) {
            setBye(players.filter((player) => player.bye))
            setNoBye(players.filter((player) => !player.bye))
          }
          if (tournament.pairingSystem) {
            setPairingSystem(tournament.pairingSystem);
          }
        }
      })
      await fetchRoundById(id).then((round) => {
        setRound(round);
      })
      // console.log(tournament)
    }
  }
  useEffect(() => {
    tournamentPlayers();
  }, [])

  if (!tournament) {
    return <div>fetching tournament</div>
  }
  if (!id) {
    return <div>fetching tournament</div>
  }

  const sortPlayers = () => {
    if (noBye) {
      noBye.sort((a, b) => {
        if (a.points == b.points) {
          return parseInt(b.rating) - parseInt(a.rating);
        }
        return b.points - a.points;
      })
      // console.log(players);
    }

  }

  const updateResult = async (pairing: TMatch, matchResult: string) => {
    if (pairings) {
      const index = pairings.findIndex((p) => p.player1 === pairing.player1);
      const updatedPairings = { ...pairings[index], result: matchResult };
      const newPairings = [...pairings];
      newPairings[index] = updatedPairings;
      setPairings(newPairings);
      // console.log(pairings);

      await updateMatch(pairing, matchResult, id);
    }
  }

  if (!tournament) {
    return <div>fetching tournament</div>
  }

  // const createMatches = async (pairing: TMatch) => {
  //   await createMatch(pairing, id);
  // }

  const createPairings = async () => {
    // tournamentPlayers();
    sortPlayers();
    // console.log(players)
    // if (!pairings) { return }
    // console.log(pairings)
    if (!pairings || pairings.length === 0) {
      if (pairingSystem === "Swiss") {
        const topHalf = noBye.slice(0, noBye.length / 2);
        const bottomHalf = noBye.slice(noBye.length / 2);
        // console.log(topHalf)
        // console.log(bottomHalf)
        let newPairings: TMatch[] = [];
        for (let i = 0; i < topHalf.length; i++) {
          let newPairing = { player1: topHalf[i], player2: bottomHalf[i], result: "" };
          await createMatch(newPairing, id);
          newPairings.push(newPairing);

          // console.log(newPairing)
        }

        if (bottomHalf.length > topHalf.length) {
          let newPairing = {
            player1: bottomHalf[bottomHalf.length - 1],
            player2: { name: "bye", rating: "N/A", points: 0, bye: false }, result: ""
          };
          await createMatch(newPairing, id);
          newPairings.push(newPairing);
        }
        for (let i = 0; i < bye.length; i++) {
          let newPairing = { player1: bye[i], player2: { name: "bye", rating: "N/A", points: 0, bye: false }, result: "" };
          await createMatch(newPairing, id);
          newPairings.push(newPairing);
        }
        setPairings(newPairings);
        tournamentPlayers();

        // pairings?.map((pairing, index) => {
        //   await createMatch(pairing, id)
        // }

        // let newPairings: TMatch[] = [];
        // for (let i = 0; i < topHalf.length; i++) {

        //   let newPairing = { player1: topHalf[i], player2: bottomHalf[i], result: "" };
        //   newPairings.push(newPairing);

        //   // console.log(newPairing)
        // }

        // if (bottomHalf.length > topHalf.length) {
        //   setMatch({
        //     player1: bottomHalf[bottomHalf.length - 1],
        //     player2: { name: 'bye', rating: "N/A", points: 0, bye: true },
        //     result: "",

        //   })
        //   // let newPairing = { player1: bottomHalf[bottomHalf.length - 1], player2: { name: "bye", rating: "N/A" }, result: "" };
        //   if (match) {
        //     newPairings.push(match);
        //   }
        // }
        // setPairings(newPairings);
      }
      else {
        let newPairings: TMatch[] = [];
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
          setMatch({
            player1: players[0],
            player2: { name: 'bye', rating: "N/A", points: 0, bye: true },
            result: ""
          })
          //const newPairing = { player1: players[0], player2: { name: "bye", rating: "N/A" }, result: "" };
          if (match)
            newPairings.push(match);
        }
        setPairings(newPairings);
      }
    }
  }

  const clearPairings = async () => {
    await deleteMatches(id);
    tournamentPlayers();
    setPairings([]);
  }

  return (
    <Container>
      <Navbar />
      <Tournament>
        Round {data && data.index + 1}
        <br></br>
        <div style={{ fontSize: "4vh" }}>
          <button className="px-1 mx-1 rounded-md text-[#edf2f4] bg-red" onClick={createPairings}>
            Create Match Pairings
          </button>
          &nbsp;
          <button className="px-1 mx-1 rounded-md text-[#edf2f4] bg-red" onClick={clearPairings}>
            Delete All Match Pairings
          </button>

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
              {pairings?.map((pairing, index) => (
                <TableRow key={index}>
                  <td>{index + 1}</td>
                  {pairing.player1 && <td>{pairing.player1.name}</td>}
                  {pairing.player1 && <td>{pairing.player1.rating}</td>}
                  {pairing.player2 && <td>{pairing.player2.name}</td>}
                  {pairing.player2 && <td>{pairing.player2.rating}</td>}
                  <td><select
                    style={{ color: "black", borderRadius: "5px", height: "3vh", fontSize: "2vh" }}
                    value={pairing.result}
                    onChange={(e) => updateResult(pairing, e.target.value)}
                  >
                    <option disabled selected value="">Select Winner</option>
                    <option value="1">White Won</option>
                    <option value="0.5">Draw</option>
                    <option value="0">Black Won</option>
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

export default Rounds;
