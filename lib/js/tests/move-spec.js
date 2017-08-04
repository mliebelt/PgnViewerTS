"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Move_1 = require("../Move");
var Reader_1 = require("../Reader");
describe("Move handling", function () {
    var pgn;
    var pgnResult;
    function _parse(_pgn) {
        pgn = new Reader_1.PgnReader();
        return pgn.parsePgn(_pgn);
    }
    beforeEach(function () {
    });
    it("should understand mmove read from pgn string", function () {
        pgnResult = _parse("1. e2 e4");
        expect(pgnResult.length).toEqual(2);
    });
    it("should construct a move from PGN parsed", function () {
        pgnResult = _parse("1. e4");
        var cm = Move_1.PgnMove.buildMove(pgnResult[0]);
        // console.log(cm)
        expect(cm).not.toBeNull();
    });
    it("should understand partial object to construct from", function () {
        var cm = Move_1.PgnMove.buildMove({ fig: 'Q', col: "e", row: '4' });
        expect(cm.row).toEqual('4');
        expect(cm.col).toEqual('e');
        expect(cm.fig).toEqual('Q');
    });
    it("should understand parsed move", function () {
        pgnResult = _parse("1. fxe4");
        var cm = Move_1.PgnMove.buildMove(pgnResult[0]);
        // console.log(cm)
        expect(cm.row).toEqual('4');
        expect(cm.col).toEqual('e');
        expect(cm.disc).toEqual('f');
        expect(cm.strike).toEqual('x');
    });
    it("should understand 2 moves parsed", function () {
        pgnResult = _parse("1. e4 e5");
        var cm1 = Move_1.PgnMove.buildMove(pgnResult[0]);
        var cm2 = Move_1.PgnMove.buildMove(pgnResult[1]);
        cm2.previousMove = cm1;
        expect(cm1.row).toEqual("4");
        expect(cm1.col).toEqual("e");
        expect(cm2.col).toEqual("e");
        expect(cm2.row).toEqual("5");
    });
});
//# sourceMappingURL=move-spec.js.map