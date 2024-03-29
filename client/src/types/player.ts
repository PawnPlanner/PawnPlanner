export type TPlayer = {
    name: string;
    rating: string,
    points: number,
    bye: boolean,
  };
  
  export type TPlayerWrapper = {
    player: TPlayer;
  };