import { TMatch } from "./match";

export type TPlayer = {
    name: string;
    rating: string,
    points: number,
    bye: boolean,
    matches?: [TMatch]; 
    _id?: string;
  };
  
  export type TPlayerWrapper = {
    player: TPlayer;
  };