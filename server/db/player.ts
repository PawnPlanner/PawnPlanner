import mongoose, { Schema } from "mongoose";

export interface IPlayer {
    name: String;
    rating: Number;
    points: Number;
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
    }
   
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
export default Player;