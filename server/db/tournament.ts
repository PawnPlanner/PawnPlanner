import mongoose, { Schema } from "mongoose";
import Player,{IPlayer} from "./player";
import { IRound } from "./round";

export interface ITournament {
    id: string;
    name: string;
    location: string,
    date: Date;
    rounds: number;
    pairingSystem: string;
    players:[IPlayer];
    owner:string;
    roundsArray:Array<String>;
    currentRound: number
}

const TournamentSchema = new Schema<ITournament>(
  {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rounds: {
      type: Number,
      required: true,
    },
    pairingSystem: {
      type: String,
      required: true,
    },
    players: {
      type: [{
      }],
      required: true,
    },
    owner: {
      type: String,
      required: true,
    }, 
    roundsArray: {
      type: Array<String>(),
      required: true,
    },
    currentRound: {
      type: Number,
      required: true,
    }
    
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model<ITournament>("Tournament", TournamentSchema);
export default Tournament;