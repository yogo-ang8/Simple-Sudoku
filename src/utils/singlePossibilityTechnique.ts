import { IBoard } from "../models/iBoard";
import { ICell } from "../models/iCell";
import { IMatchInfo, ISodukoTechnique } from "./iSodukoTechnique";

export class SinglePossibility implements ISodukoTechnique {
    name: string = "Single Possibility";
    apply(board: IBoard): boolean {
        board.refreshPossibilities();
        let singlePossibilityCells = board.cells.filter(c => c.posibilities.length == 1);
        if (singlePossibilityCells.length > 0) {
            board.cells[singlePossibilityCells[0].id].value = board.cells[singlePossibilityCells[0].id].posibilities[0];
        }
        return singlePossibilityCells.length > 0;
    }
    isMatch(cells: ICell[]): IMatchInfo {
        throw new Error("Method not implemented.");
    }
    openValue(cells: ICell[]): number {
        throw new Error("Method not implemented.");
    }

}

export class HiddenSingles implements ISodukoTechnique {
    name: string = "Hidden Singles";
    apply(board: IBoard): boolean {
        board.refreshPossibilities();
        for (let r = 0; r < board.rows.length; r++) {
            var cells = board.rowCells(r);
            if (this.applyIfMatched(board, cells)) {
                return true;
            }
        }

        for (let c = 0; c < board.columns.length; c++) {
            var cells = board.columnCells(c);
            if (this.applyIfMatched(board, cells)) {
                return true;
            }
        }

        for (let b = 0; b < board.blocks.length; b++) {
            var cells = board.blockCells(b);
            if (this.applyIfMatched(board, cells)) {
                return true;
            }
        }
        return false;
    }

    applyIfMatched(board: IBoard, cells: ICell[]): boolean {
        var matched = this.isMatch(cells);
        if (matched.status==true) {
            if (matched.cellIndex) {
                board.cells[matched.cellIndex].value = matched.value;
            }
            return true;
        }
        return false;
    }
    isMatch(cells: ICell[]): IMatchInfo {
        for (let i = 1; i <= 9; i++) {
            let count = 0;
            let index = -1;
            cells.forEach(c => {
                if (c.posibilities.indexOf(i) >= 0) {
                    count++;
                    index = c.id;
                }
            });
            if (count == 1) {
                return <IMatchInfo>{
                    status: true,
                    cellIndex: index,
                    value: i
                };
            }
        }
        return <IMatchInfo>{
            status: false
        };
    }
    openValue(cells: ICell[]): number {
        throw new Error("Method not implemented.");
    }

}