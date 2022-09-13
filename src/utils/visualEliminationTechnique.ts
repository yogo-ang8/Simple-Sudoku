import { IBoard } from '../models/iBoard';
import { ICell } from '../models/iCell';
import { IMatchInfo, ISodukoTechnique } from './iSodukoTechnique';


export class VisualElimination implements ISodukoTechnique{
    name: string="Visual Elimination";
    apply(board: IBoard): boolean {
        for (let r = 0; r < 3; r++) {
            var block_1 = board.blockCells(r*3);
            var block_2 = board.blockCells(r * 3 + 1);
            var block_3 = board.blockCells(r * 3 + 2);
            var blocksValues_1 = [board.blockValues(r * 3), board.blockValues(r * 3 + 1), board.blockValues(r * 3 + 2)];

            for (let i = 0; i < 9; i++) {
                var count = 0;
                var blockNum =-1;
                for (let j = 0; j < 3; j++) {
                    if (blocksValues_1[j].indexOf(i + 1) != -1) {
                        count++;
                    }else{
                        blockNum=j;
                    }
                }
                if(count == 2){
                    console.log(r, blockNum, i+1);
                    
                }
            }
        }
        return false;
    }
    isMatch(cells: ICell[]): IMatchInfo {
        throw new Error('Method not implemented.');
    }
    openValue(cells: ICell[]): number {
        throw new Error('Method not implemented.');
    }
}