import { Board } from "../../src/models/iBoard";
import { HiddenSingles, SinglePossibility } from '../../src/utils/singlePossibilityTechnique';
import { VisualElimination } from "../../src/utils/visualEliminationTechnique";
import { OpenSingles } from '../../src/utils/openSinglesTechnique';
var expect = require('chai').expect;

describe("test Visual Elimination", () => {
    let sampleValues = [
        5, 8, 0, 6, 0, 9, 2, 0, 0,
        4, 6, 0, 2, 0, 0, 0, 0, 0,
        1, 0, 0, 7, 8, 0, 0, 3, 6,
        0, 1, 0, 0, 0, 3, 6, 2, 0,
        0, 2, 0, 8, 7, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 6, 0, 0, 0, 0, 7, 0,
        8, 0, 0, 5, 0, 7, 1, 9, 0,
        9, 0, 0, 0, 0, 8, 0, 0, 4
    ];

    let target: Board;
    beforeEach(function () {
        target = new Board(sampleValues);
    });
    it("should found Visual Elimination number", () => {
        var board=new Board([

        ]);
        expect(target.solve()).equal(true);
    });

    it.only("should found Visual Elimination number 2", () => {
        expect(target.solve()).equal(true);
    });
});