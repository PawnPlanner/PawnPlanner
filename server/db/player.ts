import mongoose, { Schema } from "mongoose";
import { IMatch } from "./match";

export interface IPlayer {
  name: string;
  rating: number;
  points: number;
  bye: boolean;
  id: string;
  matches: [IMatch]
}

const PlayerSchema = new Schema<IPlayer>(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    bye: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    matches: {
      type:[{
        
      }],
      required: true,
  }
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
export default Player;
