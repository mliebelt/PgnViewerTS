"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Writer_1 = require("../Writer");
var Reader_1 = require("../Reader");
describe("Writing a PGN game", function () {
    // Ensure that whole games are created correctly
    // Moves are normally checked in a separate spec
    var writer = new Writer_1.PgnWriter();
    function _gm(_pgn, _fen) {
        if (_fen === void 0) { _fen = null; }
        var pgn = new Reader_1.PgnReader();
        var game = pgn.generateMoves(_pgn);
        var moves = game.getMoves();
        pgn.validate(moves, _fen);
        return game;
    }
    it("should return one move for white", function () {
        var notation = writer.write(_gm("1. e4"));
        expect(notation).toEqual("1. e4");
    });
    it("should return one move fro white and black", function () {
        var notation = writer.write(_gm("1. e4 1. e5"));
        expect(notation).toEqual("1. e4 e5");
    });
    it("should return only one space between moves", function () {
        var notation = writer.write(_gm("1. e4  1. e5  2. Nf3    Nc6"));
        expect(notation).toEqual("1. e4 e5 2. Nf3 Nc6");
    });
});
//# sourceMappingURL=writer-spec.js.map