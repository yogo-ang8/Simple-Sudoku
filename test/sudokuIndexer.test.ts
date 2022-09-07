import sudokuIndexer from "../src/utils/sudokuIndexer";
var expect = require('chai').expect;


describe("test Index Utils class",()=>{
    describe("test get cell row, column Indexs", () => {
        it("should return row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var actual = target.rowColumnNumber(0);
            expect(actual).to.deep.equal({ rowNumber: 0, columnNumber: 0 });
            actual = target.rowColumnNumber(1);
            expect(actual).to.deep.equal({ rowNumber: 0, columnNumber: 1 });
            actual = target.rowColumnNumber(8);
            expect(actual).to.deep.equal({ rowNumber: 0, columnNumber: 8 });
            actual = target.rowColumnNumber(9);
            expect(actual).to.deep.equal({ rowNumber: 1, columnNumber: 0 });
            actual = target.rowColumnNumber(10);
            expect(actual).to.deep.equal({ rowNumber: 1, columnNumber: 1 });
            actual = target.rowColumnNumber(17);
            expect(actual).to.deep.equal({ rowNumber: 1, columnNumber: 8 });
            actual = target.rowColumnNumber(45);
            expect(actual).to.deep.equal({ rowNumber: 5, columnNumber: 0 });
            actual = target.rowColumnNumber(46);
            expect(actual).to.deep.equal({ rowNumber: 5, columnNumber: 1 });
            actual = target.rowColumnNumber(53);
            expect(actual).to.deep.equal({ rowNumber: 5, columnNumber: 8 });
            actual = target.rowColumnNumber(72);
            expect(actual).to.deep.equal({ rowNumber: 8, columnNumber: 0 });
            actual = target.rowColumnNumber(73);
            expect(actual).to.deep.equal({ rowNumber: 8, columnNumber: 1 });
            actual = target.rowColumnNumber(80);
            expect(actual).to.deep.equal({ rowNumber: 8, columnNumber: 8 });
        });
    });
    describe("test get block row, column Indexs", () => {
        it("should return block (0, 0) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var cellIndexes = target.rowColumnNumber(0);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).equal(0);

            cellIndexes = target.rowColumnNumber(10);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).equal(0);

            cellIndexes = target.rowColumnNumber(20);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).equal(0);
        });
        it("should return block (0, 1) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var cellIndexes = target.rowColumnNumber(3);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(1);

            cellIndexes = target.rowColumnNumber(13);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(1);

            cellIndexes = target.rowColumnNumber(23);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(1);
        });
        it("should return block (0, 2) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var cellIndexes = target.rowColumnNumber(6);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(2);

            cellIndexes = target.rowColumnNumber(16);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(2);

            cellIndexes = target.rowColumnNumber(26);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(2);
        });

        it("should return block (1, 0) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var cellIndexes = target.rowColumnNumber(27);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(3);

            cellIndexes = target.rowColumnNumber(37);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(3);

            cellIndexes = target.rowColumnNumber(47);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(3);
        });

        it("should return block (1, 2) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            
            var cellIndexes = target.rowColumnNumber(33);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(5);

            cellIndexes = target.rowColumnNumber(43);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(5);

            cellIndexes = target.rowColumnNumber(53);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(5);
        });
        it("should return block (2, 2) row and column index with valid cell index", () => {
            var target = sudokuIndexer;
            var cellIndexes = target.rowColumnNumber(60);
            var blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(8);

            cellIndexes = target.rowColumnNumber(70);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(8);

            cellIndexes = target.rowColumnNumber(80);
            blockIndexes = target.blockNumber(cellIndexes);
            expect(blockIndexes).to.deep.equal(8);
        });
    });
});