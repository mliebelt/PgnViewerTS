"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writer_1 = require("../writer");
var reader_1 = require("../reader");
describe("Writing a PGN game", function () {
    // Ensure that whole games are created correctly
    // Moves are normally checked in a separate spec
    var writer = new writer_1.PgnWriter();
    function _gm(_pgn, _fen) {
        if (_fen === void 0) { _fen = null; }
        var pgn = new reader_1.PgnReader();
        var game = pgn.generateMoves(_pgn);
        var moves = game.getMoves();
        pgn.validate(moves, _fen);
        return game;
    }
    var notations = [
        { orig: "1. e4", target: "1. e4" },
        { orig: "1. e4 1. e5", target: "1. e4 e5" },
        { orig: "1. e4  1. e5  2. Nf3    Nc6", target: "1. e4 e5 2. Nf3 Nc6" },
        { orig: "1. e4 2. e5 3. Nf3 4. Nc6", target: "1. e4 e5 2. Nf3 Nc6" },
        { orig: "e4 e5 Nf3 Nc6", target: "1. e4 e5 2. Nf3 Nc6" },
        { orig: "e2-e4 e5 Ng1-f3 Nb8-c6", target: "1. e4 e5 2. Nf3 Nc6" },
    ];
    notations.forEach(function (notation, i) {
        it(i + " should understand notation: " + notation.orig, function () {
            var target = writer.write(_gm(notation.orig));
            expect(notation.target).toEqual(target);
        });
    });
});
//# sourceMappingURL=writer-spec.js.map