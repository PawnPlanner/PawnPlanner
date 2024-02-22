import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

// import services
import {
  CreateTournament
} from "../../services/tournament";


// import db
import { connect } from "../../db/connect";
import User, { IUser } from "../../db/user";
import Tournament, {ITournament} from "../../db/tournament";
import { updateNames } from "../../services/user";
import exp from "constants";

describe("Testing Tournament", () => {
  const testToken = process.env.DEBUG_GOOGLE_TOKEN;

  beforeAll(async () => {
    await connect("testTournament");
  });

  afterEach(async () => {
    await Tournament.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Testing create tournament", async () => {
    const tournament = new Tournament({
        name: "tourney",
        rounds: 2,
        location:"Lafayette",
        pairingSystem: "Swiss",
        date: 11/11/2024,
    });
     const savedTournament = tournament.save();
     const newTourney = CreateTournament(tournament);
    expect(((await newTourney).name)).toBe((await savedTournament).name)
  });
});