import { ObjectId } from "mongoose";

export default class LuckResponse {
  values: string[];
  isWin: boolean;
  coin?: number;
  actionCards?: ObjectId[];
  
  constructor( isWin: boolean,values: string[]=[] ) {
    this.values = values;
    this.isWin = isWin;
    // this.coin = this.coin;
    // this.actionCards = this.actionCards;
  }
}
