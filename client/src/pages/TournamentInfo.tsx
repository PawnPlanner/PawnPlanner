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
import { TRound } from "../types/round";
import fetchRounds from "../services/fetch-rounds";
import RoundL from "../components/round-layout";
import PlayerL from "../components/player";

import byeSignup from "../services/bye-signup";
import byeRemoval from "../services/bye-removal";
import Session from "../session";

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

const Heading = styled.div`
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

const ByeQueue = styled(PlayerRegistration)`
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
    const [rounds, setRounds] = useState<TRound[]>();
    const { id } = useParams();
    let navigate = useNavigate();
    const [byes, setByes] = useState("");
    const [isPrivate, setIsPrivate] = useState("");
    const [winner, setWinner] = useState("");
    let currentUser = Session.getUser();

    const tournamentPlayers = async () => {
        if (id) {
            await fetchTournamentById(id).then((tournament) => {
                setTournament(tournament);
                if (tournament && tournament.players) {
                    setPlayers(tournament.players);
                    fetchRounds(id).then((rounds) => {
                        setRounds(rounds);
                    })
                    if (tournament.isPrivate) {
                        setIsPrivate("Private");
                    } else {
                        setIsPrivate("Public");
                    }

                }
            }).then(() => {
                if (tournament) {

                }
            })

        }
    }
    useEffect(() => {
        tournamentPlayers();
    }, [])

    if (!tournament || !rounds || !currentUser) {
        return <div>fetching tournament</div>
    }
    if (!id) {
        return <div>fetching tournament</div>
    }

    const determineWinner = () => {
        players.sort((a, b) => {
            if (a.points == b.points) {
                return parseInt(b.rating) - parseInt(a.rating);
            }
            return b.points - a.points;
        })
        if (players) {
            setWinner(players[0].name);
        }
    }

    const winExpectancy = (playerRating: number, opponentRating: number) => {
        // let total = 0;
        // players.map((player) => {
        //     total += parseInt(player.rating);
        // })
        // return total;
        let exponent = (playerRating - opponentRating) / 400;
        // console.log(exponent);
        return 1 / (Math.pow(10, -exponent) + 1);
    }

    const ratingEstimate = (player1: TPlayer) => {
        if (tournament.currentRound == 1) {
            return player1.rating;
        }
        let expectedWins = 0;
        players.map((player) => {
            if (player != player1) {
                expectedWins += winExpectancy(parseInt(player1.rating), parseInt(player.rating))
            }
        })
        let expectedWinrate = expectedWins / (players.length - 1);
        let winrate = player1.points / (tournament.currentRound - 1);
        // console.log(winrate)
        // console.log(expectedWinrate)
        return Math.round(parseInt(player1.rating) + 32 * (winrate - expectedWinrate));
    }

    return (
        <Container>
            <Navbar />
            <Tournament>

                {tournament.name}

                <Info>
                    Location: {tournament.location} | Date: {tournament.date ? new Date(tournament.date).toLocaleDateString() : ""}
                    <br></br>
                    Rounds: {tournament.rounds} | Pairing System: {tournament.pairingSystem} | {isPrivate}
                    <br />
                    {currentUser.username == tournament.owner ? (<button className="px-3 mx-3 rounded-md bg-navy text-lgrey"
                        onClick={() => navigate(`/edit/${id}`)}>
                        Edit
                    </button>) : (<div></div>)}
                    {currentUser.username == tournament.owner && tournament.currentRound > parseInt(tournament.rounds) ? (<button className="px-3 mx-3 rounded-md bg-navy text-lgrey"
                        onClick={() => determineWinner()}>
                        Complete Tournament
                    </button>) : (<div></div>)}
                    {winner != "" ? (<div>Winner: {winner}</div>) : (<div></div>)}

                </Info>

            </Tournament>

            <InnerContainer>
                <PlayerRegistration>
                    {/* <ScrollBar> */}
                    <Heading>
                        Player Registration
                    </Heading>
                    <form>
                        <label>Name:&nbsp;</label>
                        <Input
                            type="text"
                            // placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Input>
                        <br></br>
                        <label>Rating:&nbsp;</label>
                        <Input
                            type="number"
                            // placeholder="Rating"
                            required
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                        </Input>
                        {/* <button className="px-3 py-0.5 mx-3 rounded-md bg-red"
                            onClick={async (e) => {
                                e.preventDefault();
                                await addPlayer({
                                    name: name,
                                    rating: rating,
                                    points: 0,
                                    bye: false
                                }, id)
                                tournamentPlayers();
                            }}>
                            {currentUser.username == tournament.owner ? (<div>Add Player</div>) : (<div>Sign Up</div>)}
                        </button> */}

                        {currentUser.username == tournament.owner ? (<button className="px-3 py-0.5 mx-3 rounded-md bg-red"
                            onClick={async (e) => {
                                e.preventDefault();
                                await addPlayer({
                                    name: name,
                                    rating: rating,
                                    points: 0,
                                    bye: false
                                }, id)
                                tournamentPlayers();
                                setName("");
                                setRating("");
                            }}>
                            Add Player
                        </button>) : (<button className="px-3 py-0.5 mx-3 rounded-md bg-red"
                            onClick={async (e) => {
                                e.preventDefault();
                                if (currentUser?._id) {
                                    console.log(currentUser._id)
                                    await addPlayer({
                                        name: name,
                                        rating: rating,
                                        points: 0,
                                        bye: false,
                                        _id: currentUser._id
                                    }, id)
                                }
                                tournamentPlayers();
                                setName("");
                                setRating("");
                            }}>
                            Sign Up
                        </button>)}

                    </form>
                    <br></br>
                    <TableRow>
                        <thead>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Points</th>
                            <th>Estimated Rating</th>
                            <th>Options</th>
                        </thead>
                        <tbody className="w-full ">
                            {players
                                .sort((a, b) => {
                                    if (a.points == b.points) {
                                        return parseInt(b.rating) - parseInt(a.rating);
                                    }
                                    return b.points - a.points;
                                })
                                .map((player, index) => (
                                    <TableRow key={index}>
                                        <td onClick={async () => {
                                            navigate(`/matchHistory/${player._id}`)
                                        }}>{player.name}</td>
                                        <td>{player.rating}</td>
                                        <td>{player.points}</td>
                                        <td>{ratingEstimate(player)}</td>

                                        {(currentUser?.username == player.name) || (currentUser?.username == tournament.owner) ? (
                                            <td className="flex justify-between">
                                                <button className="px-1 mx-1 text-sm rounded-md bg-red"

                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        await deletePlayer(player, id);
                                                        tournamentPlayers();
                                                    }}>
                                                    Remove
                                                </button>
                                                <button className="px-1 mx-1 text-sm rounded-md bg-red"
                                                    onClick={async (e) => {
                                                        e.preventDefault()
                                                        console.log(players)
                                                        await byeSignup(player, id)
                                                        tournamentPlayers();
                                                    }}>
                                                    Bye Signup
                                                </button>
                                            </td>) : (<td className="flex justify-between">

                                            </td>)
                                        }

                                    </TableRow>
                                ))}
                        </tbody>
                    </TableRow>
                    {/* </ScrollBar> */}
                </PlayerRegistration>

                <Rounds>
                    {/* <ScrollBar> */}
                    <Heading>
                        Rounds
                    </Heading>
                    {rounds
                        .map((round, index) => {
                            return (
                                <RoundL
                                    number={index}
                                    round={round}
                                    tournament={tournament}
                                />
                            )
                        })}
                    {/* </ScrollBar> */}
                </Rounds>
                <ByeQueue>
                    <Heading>
                        Bye Queue
                    </Heading>

                    <TableRow className="mx-auto">
                        <thead>
                            <th>Name</th>
                            <th>Options</th>
                        </thead>
                        <tbody>
                            {players.filter((player) => player.bye)
                                .map((player, index) => (
                                    <TableRow key={index} >
                                        <td>{player.name}</td>
                                        <td> <button className="px-2 py-1 mx-1 text-sm rounded-md bg-red"
                                            onClick={async (e) => {
                                                e.preventDefault()
                                                await byeRemoval(player, id)
                                                tournamentPlayers();
                                            }}>
                                            Remove
                                        </button>
                                        </td>
                                    </TableRow>
                                ))}
                        </tbody>
                    </TableRow>

                </ByeQueue>
            </InnerContainer>
        </Container>
    )
}

export default TournamentInfo;
