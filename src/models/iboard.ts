import { IBlock } from "./iblock";
import { ICell } from "./icell";
import { IColumn } from './icolumn';
import { IRow } from './irow';
import { IPosibility } from './iposibility';

export interface IBoard{
    cells:Array<ICell>;
    blocks:Array<IBlock>;
    rows:Array<IRow>;
    columns:Array<IColumn>;
}
export class Board implements IBoard{
    cells = new Array<ICell>(81);
    blocks = new Array<IBlock>(9);
    rows = new Array<IRow>(9);
    columns = new Array<IColumn>(9);
    constructor(values:Array<number>){
        if (values.length != 81)
        {
            throw new Error("Invalid length of values.");
        }
        let rId = 0;
        values.forEach((v,i)=>{
            let cId = i%9;
            let event = i-cId;
            let rId = event== 0? 0: i/event;
            this.cells[i]={
                posibilities: new Array<IPosibility>(9),
                id:i,
                value:undefined
            };
            if (this.rows[cId] === undefined) {
                
            }
            if (v > 0 && v < 10) {
                this.cells[i].value = v;
            }
        });


    }
}

