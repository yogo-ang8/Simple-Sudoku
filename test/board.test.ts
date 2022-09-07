import { Board } from '../src/models/iBoard';
import sudokuIndexer from '../src/utils/sudokuIndexer';
var expect = require('chai').expect;
describe("test board creation", () => {
    it("should create cells, rows, columns and blocks with init value", () => {
        let sampleCells = [
            2, 0, 4, 6, 1, 0, 0, 0, 5,
            0, 0, 5, 0, 0, 0, 0, 3, 0,
            6, 0, 0, 0, 7, 0, 0, 0, 8,
            0, 0, 0, 0, 0, 5, 0, 0, 3,
            0, 0, 2, 0, 0, 0, 5, 4, 9,
            0, 0, 0, 0, 9, 0, 0, 8, 2,
            9, 8, 0, 7, 5, 0, 0, 0, 0,
            0, 4, 0, 0, 2, 6, 0, 9, 7,
            0, 0, 0, 1, 3, 0, 0, 0, 0
        ];
        let target = new Board(sampleCells);
        var str = target.printNumbers(target.cells.map((c)=>c.value));
        const expected = target.printNumbers(sampleCells);// `2,0,4,6,1,0,0,0,5,\n0,0,5,0,0,0,0,3,0,\n6,0,0,0,7,0,0,0,8,\n0,0,0,0,0,5,0,0,3,\n0,0,2,0,0,0,5,4,9,\n0,0,0,0,9,0,0,8,2,\n9,8,0,7,5,0,0,0,0,\n0,4,0,0,2,6,0,9,7,\n0,0,0,1,3,0,0,0,0,\n`;

        expect(str).equal(expected);

    });
    describe("test row, column and block number for cell", () => {
        let sampleIndex = [
            0, 1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25, 26,
            27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44,
            45, 46, 47, 48, 49, 50, 51, 52, 53,
            54, 55, 56, 57, 58, 59, 60, 61, 62,
            63, 64, 65, 66, 67, 68, 69, 70, 71,
            72, 73, 74, 75, 76, 77, 78, 79, 80];

        let target = new Board(sampleIndex);
        const expectedIndexByRow = (rowNum: number): Array<number> => {
            var startIndex = rowNum * 9;
            var list = new Array<number>;
            for (let i = 0; i < 9; i++) {
                list.push(sampleIndex[startIndex + i]);
            }
            return list;
        };
        const expectedIndexByColumn = (columnNum: number): Array<number> => {
            var list = new Array<number>;
            for (let i = 0; i < 9; i++) {
                list.push(sampleIndex[9 * i + columnNum]);
            }
            return list;
        };
        const expectedIndexByBlockNum = (blockNum: number): Array<number> => {
            var list = new Array<number>;
            var blockColNum = blockNum % 3;
            var blockRowNum = (blockNum - blockColNum) / 3;
            let startRow = blockRowNum * 3;
            let startCol = blockColNum * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let index = (startRow + i) * 9 + startCol + j;
                    list.push(sampleIndex[index]);
                }
            }
            return list;
        };

        const expectCellIndex = (index: number, expectedRowNum: number, expectedColNum: number, expectedBlockNum: number): void => {
            let rowCol = sudokuIndexer.rowColumnNumber(index);
            expect(rowCol.rowNumber).equal(expectedRowNum);
            expect(rowCol.columnNumber).equal(expectedColNum);
            var blockNum = sudokuIndexer.blockNumber(rowCol);
            expect(blockNum).equal(expectedBlockNum);
            expect(target.cells[index].blockNumber).equal(blockNum);
            expect(target.blocks[blockNum][(rowCol.rowNumber % 3) * 3 + rowCol.columnNumber % 3]).equal(index);
        };

        it("should return correct number of block", () => {
            let index = 0;
            expectCellIndex(index, 0, 0, 0);
            index = 20;
            expectCellIndex(index, 2, 2, 0);
            index = 3;
            expectCellIndex(index, 0, 3, 1);
            index = 23;
            expectCellIndex(index, 2, 5, 1);
            index = 6;
            expectCellIndex(index, 0, 6, 2);
            index = 26;
            expectCellIndex(index, 2, 8, 2);
            index = 27;
            expectCellIndex(index, 3, 0, 3);
            index = 47;
            expectCellIndex(index, 5, 2, 3);
            index = 30;
            expectCellIndex(index, 3, 3, 4);
            index = 40;
            expectCellIndex(index, 4, 4, 4);
            index = 50;
            expectCellIndex(index, 5, 5, 4);
            index = 33;
            expectCellIndex(index, 3, 6, 5);
            index += 20;
            expectCellIndex(index, 5, 8, 5);
            index = 54;
            expectCellIndex(index, 6, 0, 6);
            index += 20;
            expectCellIndex(index, 8, 2, 6);
            index = 57;
            expectCellIndex(index, 6, 3, 7);
            index += 20;
            expectCellIndex(index, 8, 5, 7);
            index = 60;
            expectCellIndex(index, 6, 6, 8);
            index += 20;
            expectCellIndex(index, 8, 8, 8);
        });
        it("should return correct number of row", () => {
            for (let i = 0; i < 9; i++) {
                var actual = target.rowValues(i);
                var actualStr = target.printNumbers(actual);
                var expected = expectedIndexByRow(i);
                var expectedStr = target.printNumbers(expected);
                expect(actualStr).equal(expectedStr);
            }
        });
        it("should return correct number of column", () => {
            for (let i = 0; i < 9; i++) {
                var actual = target.columnValues(i);
                var actualStr = target.printNumbers(actual);
                var expected = expectedIndexByColumn(i);
                var expectedStr = target.printNumbers(expected);
                expect(actualStr).equal(expectedStr);
            }
        });
        it("should return correct number of block", () => {
            for (let i = 0; i < 9; i++) {
                var actual = target.blockValues(i);
                var actualStr = target.printNumbers(actual);
                var expected = expectedIndexByBlockNum(i);
                var expectedStr = target.printNumbers(expected);
                expect(actualStr).equal(expectedStr);
            }
        });
    });
});
