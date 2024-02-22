import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: papayawhip;
  padding: 10px;
  width: 250px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #de215e;
  font-size: 16px;
  text-align: center;
  border: solid 2px #de215e;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const Nutrition = styled(SeeMoreText)`
  color: #ff6100;
  border: solid 2px #ff6100;
  margin-bottom: 12px;
`;
const SaveRecipe = styled.div`
  color: #D90429;
  text-align: center;
  font-size: 8vh;
  font-weight: bold;
  padding: 2vh;
`;
const Form = styled.form`
  text-align: center;
  font-size: 3vh;
`;

const Create = styled(SeeMoreText)`
  text-align: center;
  color: #edf2f4;
  font-size: 2vh;
  border: none;
  background-color: #2B2D42;
`;
const Close = styled(SeeMoreText)`
  color: red;
  border: solid 2px red;
`;
const IngredientsText = styled(SeeMoreText)`
  color: #770cf3;
  border: solid 2px #770cf3;
  margin-bottom: 12px;
`;

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
  // font-size: 25px;
  // font-weight: bold;
  // box-shadow: 0 3px 6px 0 #555;
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
const Logo = styled.img`
  // width: height * 2.3;
  // justify-content: center;
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
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // height:90vh;
  //   background: #B7BFCC;
background: #edf2f4;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Input = styled.input`
border-radius: 5px;
height: 3vh;
font-size: 2vh;
`;

const CreateTournament = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [rounds, setRounds] = useState('');
  const [pairingSystem, setPairingSystem] = useState('Swiss');
  const [data, setData] = useState({
    name: "",
    location: "",
    date: new Date(),
    rounds: 0,
    pairingSystem: "Swiss"
  });

  function handleNameChange(e) {
    setData(d => ({ ...d, name: e.target.value }));
    // console.log(data);
  }

  function handleLocationChange(e) {
    setData(d => ({ ...d, location: e.target.value }));
    // console.log(data);
  }

  function handleDateChange(e) {
    setData(d => ({ ...d, date: e }));
    // console.log(data);
  }

  function handleRoundsChange(e) {
    setData(d => ({ ...d, rounds: e.target.value }));
    // console.log(data);
  }

  function handlePairingChange(e) {
    setData(d => ({ ...d, pairingSystem: e.target.value }));
    // console.log(data);
  }

  return (
    <Container>
      <Header>
        <AppName>
          <Logo img src="/img/pawnlogo.png" />
        </AppName>
      </Header>

      <InnerContainer>
        <SaveRecipe>
          Create a Tournament
        </SaveRecipe>
        <Form>
          <label>Name</label>
          <br></br>
          <Input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleNameChange(e);
            }}
          />
          <br></br>
          <br></br>
          <label>Location</label>
          <br></br>
          <Input
            type="text"
            required
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              handleLocationChange(e);
            }}
          ></Input>
          <br></br>
          <br></br>
          <label>Date</label>
          <br></br>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              handleDateChange(date);
            }} />
          <br></br>
          <br></br>
          <label>Number of rounds</label>
          <br></br>
          <Input
            type="number"
            required
            min="0"
            value={rounds}
            onChange={(e) => {
              setRounds(e.target.value);
              handleRoundsChange(e);
            }} />
          <br></br>
          <br></br>
          <label>Pairing System
          </label>
          <br></br>
          <select
            style={{ borderRadius: "5px", height: "3vh", fontSize: "2vh" }}
            value={pairingSystem}
            onChange={(e) => {
              setPairingSystem(e.target.value);
              handlePairingChange(e);
            }}>
            <option value="Swiss">Swiss</option>
            <option value="Round-Robin">Round-Robin</option>
          </select>
          <br></br>
          <br></br>
          <br></br>
          {data.name !== "" && data.location !== "" && data.rounds !== 0 && <Link
            to="/TournamentInfo"
            state={{ data: data }}
          >
            <Create>
              Create
            </Create>
          </Link>}
        </Form>
      </InnerContainer>
    </Container >
  );
};

export default CreateTournament;
