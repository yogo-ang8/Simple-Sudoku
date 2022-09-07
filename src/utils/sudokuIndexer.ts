import IRowColumnNumber from "../models/iRowColumnNumber";


class sudokuIndexer{

    rowColumnNumber(index: number): IRowColumnNumber {
        let colNum = index % 9;
        return <IRowColumnNumber>{
            rowNumber: (index - colNum) / 9,
            columnNumber: colNum
        };
    }

    blockNumber(rowColNum: IRowColumnNumber): number {
        return (rowColNum.rowNumber - rowColNum.rowNumber % 3) + (rowColNum.columnNumber - rowColNum.columnNumber % 3) / 3;
    }

}

export default new sudokuIndexer();