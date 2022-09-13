import { IBoard } from "../models/iBoard";
import { ICell } from "../models/iCell";



export interface ISodukoTechnique {
    name: string;
    apply(board: IBoard): boolean;
    isMatch(cells: Array<ICell>): IMatchInfo;
    openValue(cells:Array<ICell>):number;
}
export interface IMatchInfo{
    status:boolean;
    cellIndex?:number;
    value:number;
}

export class SudokuInputParser{
    parse(txt:string):Array<number>{
        
    }
}