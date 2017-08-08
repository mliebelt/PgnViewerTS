"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reader_1 = require("../reader");
describe("PGN check games produced correct", function () {
    // Ensure that whole games are created correctly
    // Moves are normally checked in a separate spec
    var moves;
    var game;
    var pgn;
    function _validate(_pgn, _fen) {
        pgn = new reader_1.PgnReader();
        game = pgn.generateMoves(_pgn);
        moves = game.getMoves();
        pgn.validate(moves, _fen);
        return game;
    }
    describe("should ensure correct nummber", function () {
        it("if missing", function () {
            _validate('e4 e5', null);
            expect(moves.length).toEqual(2);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
        });
        it("from any position", function () {
            _validate("Re1 d5", "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 6");
            expect(moves.length).toEqual(2);
            expect(moves[0].moveNumber).toEqual(6);
            expect(moves[1].moveNumber).toEqual(6);
        });
        it("over more moves", function () {
            _validate("Nxe4 5.d4 exd4 6.Re1 d5", "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4");
            expect(moves.length).toEqual(5);
            expect(moves[0].moveNumber).toEqual(4);
            expect(moves[1].moveNumber).toEqual(5);
            expect(moves[2].moveNumber).toEqual(5);
            expect(moves[3].moveNumber).toEqual(6);
            expect(moves[4].moveNumber).toEqual(6);
        });
        it("in variations", function () {
            _validate("e4 e5 (d5)", null);
            expect(moves.length).toEqual(3);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(1);
        });
        it("if missing in variations", function () {
            _validate("1. e4 e5 (d5 d4 dxe4)", null);
            expect(moves.length).toEqual(5);
            expect(moves[2].moveNumber).toEqual(1);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(2);
        });
        it("with mixed format of move numbers in variations", function () {
            _validate("1. e4 e5 (1... d5 d4 2 dxe4)", null);
            expect(moves.length).toEqual(5);
            expect(moves[2].moveNumber).toEqual(1);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(2);
        });
    });
    describe("it should use disambiguation", function () {
        it("where necessary", function () {
            _validate("Nbd7", "rnbqkb1r/ppp2ppp/3p1n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 4");
            expect(moves.length).toEqual(1);
            expect(moves[0].notation).toEqual("Nbd7");
        });
        it("not, where not necessary", function () {
            _validate("Ne7", "r1bqkbnr/ppp2ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4");
            expect(moves.length).toEqual(1);
            expect(moves[0].notation).toEqual("Ne7");
        });
        it("sometimes, where not necessary", function () {
            _validate("N8e7", "r1bqkbnr/ppp2ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4");
            expect(moves.length).toEqual(1);
            expect(moves[0].notation).toEqual("Ne7");
        });
        it("not for wrong moves", function () {
            expect(function () { _validate("N6e7", "r1bqkbnr/ppp2ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4"); })
                .toThrow("Notation: N6e7  not valid.");
        });
    });
}); // End of PGN check games produced correct
//# sourceMappingURL=game-spec.js.map