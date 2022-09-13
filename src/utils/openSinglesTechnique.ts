
import { IBoard } from "../models/iBoard";
import { ICell } from "../models/iCell";
import { ISodukoTechnique, IMatchInfo } from "./iSodukoTechnique";

export class OpenSingles implements ISodukoTechnique {
    name: string = "Open Singles";
    apply(board: IBoard): boolean {
        var matched: IMatchInfo;
        let i = 0;
        // row search single
        for (i = 0; i < board.rows.length; i++) {
            let rowCells = board.rowCells(i);
            matched = this.isMatch(rowCells);
            if (matched.status) {
                if (matched.cellIndex) {
                    rowCells[matched.cellIndex].value = matched.value === undefined ? 0 : matched.value;
                }
                return true;
            }
        }
        // column search single
        for (i = 0; i < board.columns.length; i++) {
            let colCells = board.columnCells(i);
            matched = this.isMatch(colCells);
            if (matched.status) {
                if (matched.cellIndex) {
                    colCells[matched.cellIndex].value = matched.value === undefined ? 0 : matched.value;
                }
                return true;
            }
        }
        // block search single
        for (let i = 0; i < board.blocks.length; i++) {
            let blockCells = board.blockCells(i);

            matched = this.isMatch(blockCells);
            if (matched.status) {
                if (matched.cellIndex) {
                    blockCells[matched.cellIndex].value = matched.value === undefined ? 0 : matched.value;
                }
                return true;
            }
        }
        return false;
    }

    isMatch(cells: Array<ICell>): IMatchInfo {
        let count = 0;
        var matched = <IMatchInfo>{ status: true };
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].value == 0) {
                count++;
                matched.cellIndex = i;
            }
            if (count > 1) {
                matched.status = false;
                matched.cellIndex = undefined;
                break;
            }
        }
        if (count == 0) {
            matched.status = false;
        }
        if (matched.status) {
            matched.value = this.openValue(cells);
        }
        return matched;
    }

    openValue(cells: ICell[]): number {
        let possibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        cells.forEach((c) => {
            if (c.value != 0) {
                const index = possibles.indexOf(c.value);
                if (index > -1) {
                    // only splice array when item is found
                    // 2nd parameter means remove one item only
                    possibles.splice(index, 1);
                }
            }
        });
        if (possibles.length == 1) {
            return possibles[0];
        }
        else {
            return 0;
        }
    }
}
