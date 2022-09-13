import { ICell } from './iCell';
import sudokuIndexer from "../utils/sudokuIndexer";
import { ISodukoTechnique } from '../utils/iSodukoTechnique';
import { OpenSingles } from '../utils/openSinglesTechnique';
import { HiddenSingles, SinglePossibility } from '../utils/singlePossibilityTechnique';

export interface IBoard {
    cells: Array<ICell>;
    rows: Array<Array<number>>;
    columns: Array<Array<number>>;
    blocks: Array<Array<number>>;

    rowCells(rowNum: number): Array<ICell>;
    columnCells(colNum: number): Array<ICell>;
    blockCells(blockNum: number): Array<ICell>;
    rowValues(rowNum: number): Array<number>;
    cellRowValues(cell: ICell): Array<number>;
    columnValues(colNum: number): Array<number>;
    cellColumnValues(cell: ICell): Array<number>;
    blockValues(blockNum: number): Array<number>;
    cellBlockValues(cell: ICell): Array<number>;
    printNumbers(values: Array<number>, separator: string): string;

    refreshPossibilities(): void;
    refreshCellPossibilities(cell: ICell, blockValues: Array<number>, rowValues: Array<number>, colValues: Array<number>): void;
}

export class Board implements IBoard {
    cells = new Array<ICell>(81);
    rows = new Array<Array<number>>(9);
    columns = new Array<Array<number>>(9);
    blocks = new Array<Array<number>>(9);
    private _techniques = [new OpenSingles(), new SinglePossibility(), new HiddenSingles()];
    constructor(values: Array<number>) {
        if (values.length != 81) {
            throw new Error("Invalid length of values.");
        }
        for (let i = 0; i < 9; i++) {
            this.rows[i] = new Array<number>(9);
            this.columns[i] = new Array<number>(9);
            this.blocks[i] = new Array<number>(9);
        }
        for (let j = 0; j < values.length; j++) {
            let rowColNum = sudokuIndexer.rowColumnNumber(j);
            let blockNum = sudokuIndexer.blockNumber(rowColNum);
            this.cells[j] = {
                posibilities: new Array<number>,
                value: values[j],
                rowColumnNumber: rowColNum,
                blockNumber: blockNum,
                id: j
            };
            this.blocks[blockNum][(rowColNum.rowNumber % 3) * 3 + rowColNum.columnNumber % 3] = j;
            this.rows[rowColNum.rowNumber][rowColNum.columnNumber] = j;
            this.columns[rowColNum.columnNumber][rowColNum.rowNumber] = j;
        }
    }

    refreshPossibilities(): void {
        let blocksValues = new Array<Array<number>>(9);
        for (let i = 0; i < this.blocks.length; i++) {
            blocksValues[i] = this.blockValues(i);
            //console.log(this.printNumbers(blocksValues[i]));
        }
        let rowsValues = new Array<Array<number>>(9);
        for (let i = 0; i < this.rows.length; i++) {
            rowsValues[i] = this.rowValues(i);
            //console.log(this.printNumbers(rowsValues[i]));
        }
        let colsValues = new Array<Array<number>>(9);
        for (let i = 0; i < this.columns.length; i++) {
            colsValues[i] = this.columnValues(i);
            //console.log(this.printNumbers(colsValues[i]));
        }
        this.cells.forEach((c) => {
            this.refreshCellPossibilities(c, blocksValues[c.blockNumber],
                rowsValues[c.rowColumnNumber.rowNumber], colsValues[c.rowColumnNumber.columnNumber]);
        });
    };
    refreshCellPossibilities(cell: ICell, blockValues: Array<number>,
        rowValues: Array<number>, colValues: Array<number>): void {
        cell.posibilities = new Array<number>;
        if (cell.value == 0) {
            var excludes = blockValues.concat(rowValues).concat(colValues);
            for (let i = 0; i < 9; i++) {
                var index = excludes.indexOf(i + 1);
                if (index == -1) {
                    cell.posibilities.push(i + 1);
                }
            }
        }
    };

    rowCells(rowNum: number): Array<ICell> {
        return this.rows[rowNum].map((i) => this.cells[i]);
    };
    columnCells(colNum: number): Array<ICell> {
        return this.columns[colNum].map((i) => this.cells[i]);
    };
    blockCells(blockNum: number): Array<ICell> {
        return this.blocks[blockNum].map((i) => this.cells[i]);
    };
    rowValues(rowNum: number): Array<number> {
        return this.rowCells(rowNum).map((c) => c.value);
    };
    cellRowValues(cell: ICell): Array<number> {
        return this.rowCells(cell.rowColumnNumber.rowNumber).map((c) => c.value);
    };
    columnValues(colNum: number): Array<number> {
        return this.columnCells(colNum).map((c) => c.value);
    };
    cellColumnValues(cell: ICell): Array<number> {
        return this.columnCells(cell.rowColumnNumber.columnNumber).map((c) => c.value);
    };
    blockValues(blockNum: number): Array<number> {
        return this.blockCells(blockNum).map((c) => c.value);
    };
    cellBlockValues(cell: ICell): Array<number> {
        return this.blockCells(cell.blockNumber).map((c) => c.value);
    };

    printNumbers(values: Array<number>, separator: string = ','): string {
        return values.map(v => v.toString()).join(separator);
    };

    isFinished() {
        return this.cells.filter(c => c.value == 0).length == 0;
    }
    solveOne(): boolean {
        var applied = false;
        console.time("techniques execution time")
        for (let i = 0; i < this._techniques.length; i++) {
            console.log(this._techniques[i].name)
            applied = this._techniques[i].apply(this);
            console.timeLog("techniques execution time")
            if (applied) {
                break;
            }
        }
        return applied;
    }
    solve(): boolean {
        var applied = false;
        do {
            applied = this.solveOne();
        } while (applied)
        return this.isFinished();
    }
    // rowColumnNumber(index: number): IRowColumnNumber {
    //     let colNum = index % 9;
    //     return <IRowColumnNumber>{
    //         rowNumber: (index - colNum) / 9,
    //         columnNumber: colNum
    //     };
    // }

    // blockNumber(rowColNum: IRowColumnNumber): number {
    //     return (rowColNum.rowNumber - rowColNum.rowNumber % 3) + (rowColNum.columnNumber - rowColNum.columnNumber % 3) / 3;
    // }

}

