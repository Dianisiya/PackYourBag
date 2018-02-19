import { Statuses } from "./Statuses";

export default class City{
    constructor (name: string){
        this.name = name;
        this.status = Statuses.Neutral;
    }

    public name: string;
    public temperature: number;
    public weather: string;
    public status: Statuses;

    public weatherIcon: string;
}