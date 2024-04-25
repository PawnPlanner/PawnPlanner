import { TMatch } from "./match"

export type TPlayer = {
    name: string,
    rating: number,
    points: number,
    bye: boolean,
    matches?: [TMatch],
    _id?: string,
}