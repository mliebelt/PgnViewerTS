"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reader_1 = require("../Reader");
describe("PGN validate moves", function () {
    // only care about validating an array of PgnMoves
    var moves;
    var game;
    var pgn;
    function _validate(_pgn) {
        pgn = new Reader_1.PgnReader();
        game = pgn.generateMoves(_pgn);
        moves = game.getMoves();
        pgn.validate(moves, null);
        return moves;
    }
    // place holder for all functionality that validates PGN
    it("should validate main lines", function () {
        moves = _validate('1. e4 d5 2. exd5 c5 3. dxc6');
        expect(moves.length).toEqual(5);
        expect(moves[0].notation).toEqual('e4');
        expect(moves[0].col).toEqual('e');
        expect(moves[4].notation).toEqual('dxc6');
        expect(moves[4].strike).toEqual('x');
    });
    it("should validate false checks and mates", function () {
        moves = _validate('e4# d5+ exd5+ Qxd5#');
        expect(moves[0].notation).toEqual("e4");
        expect(moves[1].notation).toEqual("d5");
        expect(moves[2].notation).toEqual("exd5");
        expect(moves[3].notation).toEqual("Qxd5");
    });
    it("should validate moves with unusual notation", function () {
        moves = _validate('Pe2-e4 d7d5 Ng1xf3 b8xc6');
        expect(moves[0].notation).toEqual("e4");
        expect(moves[1].notation).toEqual("d5");
        expect(moves[2].notation).toEqual("Nf3");
        expect(moves[3].notation).toEqual("Nc6");
    });
    // This is wrong, because it should be a valid notation and not throw an error
    it("should validate moves with wrong disambiguation", function () {
        var foo = function () { _validate('ee4 d5 xd5 Nbc6'); };
        //expect(foo).toThrow()
    });
    it("should validate moves with pawns without disambiguation", function () {
        moves = _validate("e4 d5 xd5");
        expect(moves[0].notation).toEqual("e4");
        expect(moves[1].notation).toEqual("d5");
        expect(moves[2].notation).toEqual("xd5");
    });
}); // End of describe "PGN validate moves"
//# sourceMappingURL=ValidateSpec.js.map