import { Board } from "../../src/models/iBoard";
import { OpenSingles } from "../../src/utils/openSinglesTechnique";
var expect = require('chai').expect;

describe("test Open Singles",()=>{
    const sampleCells = [
        8, 7, 3, 6, 9, 5, 0, 1, 2,
        0, 0, 5, 0, 0, 0, 0, 3, 4,
        6, 0, 0, 0, 7, 0, 0, 0, 5,
        0, 0, 0, 1, 0, 3, 0, 0, 9,
        0, 0, 2, 7, 4, 8, 5, 4, 0,
        0, 0, 0, 6, 9, 5, 0, 8, 1,
        9, 8, 0, 7, 5, 0, 0, 0, 8,
        0, 4, 0, 0, 0, 6, 0, 9, 6,
        0, 0, 0, 1, 3, 0, 0, 0, 7
    ];
    let board:Board;
    beforeEach(function() {
        board = new Board(sampleCells);
    });
    it("should create cells, rows, columns and blocks with init value",()=>{
        let target = new OpenSingles();
        //console.log(board.printArray(sampleCells));
        let actual = target.apply(board);
        //console.log(board.toArrayString());
        expect(actual).equal(true);
        actual = target.apply(board);
        //console.log(board.printArray(board.blocks[1][1].cells.map((cell:ICell)=>cell.value)));
        expect(actual).equal(true);
        actual = target.apply(board);
        expect(actual).equal(true);
        actual = target.apply(board);
        expect(actual).equal(false);
    });
});