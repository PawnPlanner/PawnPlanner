export type TPlayer = {
    name: string;
    rating: number,
    points: number,
    bye: boolean,
  };
  
  export type TPlayerWrapper = {
    player: TPlayer;
  };