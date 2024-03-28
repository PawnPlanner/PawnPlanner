import mongoose, { Schema } from "mongoose";

export interface IPlayer {
  name: string;
  rating: number;
  points: number;
  bye: boolean;
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
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model<IPlayer>("Player", PlayerSchema);
export default Player;