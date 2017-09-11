"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reader_1 = require("../reader");
describe("PGN validate", function () {
    // only care about validating an array of PgnMoves
    var moves;
    var game;
    var pgn;
    function _validate(_pgn, _fen) {
        pgn = new reader_1.PgnReader();
        game = pgn.generateMoves(_pgn);
        moves = game.getMoves();
        pgn.validate(moves, _fen);
        return moves;
    }
    describe("regular moves", function () {
        it("should validate main lines", function () {
            moves = _validate('1. e4 d5 2. exd5 c5 3. dxc6', null);
            expect(moves.length).toEqual(5);
            expect(moves[0].notation).toEqual('e4');
            expect(moves[0].col).toEqual('e');
            expect(moves[0].nextMove).toEqual(moves[1]);
            expect(moves[1].previousMove).toEqual(moves[0]);
            expect(moves[4].notation).toEqual('dxc6');
            expect(moves[4].strike).toEqual('x');
        });
    }); // End of describe "PGN validate regular moves"
    describe("sloppy moves", function () {
        it("should ignore false checks and mates", function () {
            moves = _validate('e4# d5+ exd5+ Qxd5#', null);
            expect(moves[0].notation).toEqual("e4");
            expect(moves[1].notation).toEqual("d5");
            expect(moves[2].notation).toEqual("exd5");
            expect(moves[3].notation).toEqual("Qxd5");
        });
        it("should validate moves with unusual notation", function () {
            moves = _validate('Pe2-e4 d7d5 Ng1xf3 b8xc6', null);
            expect(moves[0].notation).toEqual("e4");
            expect(moves[1].notation).toEqual("d5");
            expect(moves[2].notation).toEqual("Nf3");
            expect(moves[3].notation).toEqual("Nc6");
        });
        it("should validate moves with wrong disambiguation", function () {
            var foo = function () { _validate('ee4 d5 xd5 Nbc6', null); };
            expect(moves[3].notation).toEqual("Nc6");
        });
        it("should validate moves with pawns without disambiguation", function () {
            moves = _validate("e4 d5 xd5", null);
            expect(moves[0].notation).toEqual("e4");
            expect(moves[1].notation).toEqual("d5");
            expect(moves[2].notation).toEqual("exd5");
        });
        it("should validate moves with knights with unnecessary disambiguation", function () {
            moves = _validate("e4 e5 Ngf3", null);
            expect(moves[0].notation).toEqual("e4");
            expect(moves[1].notation).toEqual("e5");
            expect(moves[2].notation).toEqual("Nf3");
        });
    }); // End of describe "PGN validate sloppy moves"
    describe("move numbers", function () {
        it("should validate no move numbers", function () {
            moves = _validate("e4 e5 Nf3 Nc6 Bb5 a6", null);
            expect(moves.length).toEqual(6);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(2);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(3);
            expect(moves[5].moveNumber).toEqual(3);
        });
        it("should validate existing move numbers", function () {
            moves = _validate("1. e4 e5 2. Nf3 Nc6 3. Bb5 a6", null);
            expect(moves.length).toEqual(6);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(2);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(3);
            expect(moves[5].moveNumber).toEqual(3);
        });
        it("should validate additional move numbers if correct", function () {
            moves = _validate("1. e4 1. e5 2. Nf3 2. Nc6 3. Bb5 3. a6", null);
            expect(moves.length).toEqual(6);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(2);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(3);
            expect(moves[5].moveNumber).toEqual(3);
        });
        it("should falsify wrong move numbers", function () {
            expect(function () { _validate("1. e4 e5 3. Nf3 Nc6 4. Bb5 a6", null); })
                .toThrow("Wrong move number for Nf3");
        });
    }); // End of describe "PGN validate move numbers"
    describe("variations", function () {
        it("read variations", function () {
            // read normal variations
            moves = _validate("1. e4 e5 (1... d5 2. d4) (1... c5 2. Nf3)", null);
            expect(moves.length).toEqual(6);
            expect(moves[0].variations.length).toEqual(0);
            expect(moves[1].variations.length).toEqual(2);
            expect(moves[1].variations[0]).toEqual(moves[2]);
            expect(moves[1].variations[1]).toEqual(moves[4]);
            expect(moves[4].previousMove).toEqual(moves[0]);
            expect(moves[5].previousMove).toEqual(moves[4]);
            expect(moves[2].previousMove).toEqual(moves[0]);
            expect(moves[3].previousMove).toEqual(moves[2]);
        });
        it("with move numbers", function () {
            // check the held move numbers
            moves = _validate("1. e4 e5 (1... d5 2. d4) (1... c5 2. Nf3)", null);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(1);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(1);
            expect(moves[5].moveNumber).toEqual(2);
        });
        it("without move numbers", function () {
            // check the computed move numbers as well
            moves = _validate("e4 e5 (d5 d4) (c5 Nf3)", null);
            expect(moves[0].moveNumber).toEqual(1);
            expect(moves[1].moveNumber).toEqual(1);
            expect(moves[2].moveNumber).toEqual(1);
            expect(moves[3].moveNumber).toEqual(2);
            expect(moves[4].moveNumber).toEqual(1);
            expect(moves[5].moveNumber).toEqual(2);
        });
    }); // End of describe "PGN validate variations"
    describe("NAGs", function () {
        it("understand special symbols (like !, ??, ...", function () {
            moves = _validate("1. e4! Na6? 2. d4 !! b6 ?? 3. Nc3?! Nf6 !?4. Be2=", null);
            expect(moves.length).toEqual(7);
            expect(moves[0].nags.length).toEqual(1);
            expect(moves[1].nags.length).toEqual(1);
            expect(moves[2].nags.length).toEqual(1);
            expect(moves[3].nags.length).toEqual(1);
            expect(moves[4].nags.length).toEqual(1);
            expect(moves[5].nags.length).toEqual(1);
            expect(moves[6].nags.length).toEqual(1);
        });
        it("understand $-notation", function () {
            moves = _validate("1. e4$1 Na6$2 2. d4 $3 b6 $4 3. Nc3$5 Nf6 $6 4. Be2$7", null);
            expect(moves.length).toEqual(7);
            expect(moves[0].nags.length).toEqual(1);
            expect(moves[1].nags.length).toEqual(1);
            expect(moves[2].nags.length).toEqual(1);
            expect(moves[3].nags.length).toEqual(1);
            expect(moves[4].nags.length).toEqual(1);
            expect(moves[5].nags.length).toEqual(1);
            expect(moves[6].nags.length).toEqual(1);
        });
        it("understand range of $-notation", function () {
            expect(function () { _validate("1. e4 $1 e5 $10 2. d4 $50 d5 $139 3. c4 $140", null); }).toThrow("NAG: $140 number is too high. Maximum is 139.");
        });
    }); // End of describe "PGN validate NAGs"
    describe("special moves", function () {
        it("should understand short castling", function () {
            moves = _validate("5. O-O O-O", "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5");
            expect(moves.length).toEqual(2);
            expect(moves[0].notation).toEqual("O-O");
            expect(moves[1].notation).toEqual("O-O");
        });
        it("should understand long castling", function () {
            moves = _validate("8. O-O-O O-O-O", "r3kb1r/ppqbpppp/2np1n2/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R w KQkq - 7 8");
            expect(moves.length).toEqual(2);
            expect(moves[0].notation).toEqual("O-O-O");
            expect(moves[1].notation).toEqual("O-O-O");
        });
        it("should understand en passent (no special notation for it)", function () {
            // one en passent situation
            moves = _validate("exf6", "rnbqkbnr/ppp1p1pp/8/3pPp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3");
            expect(moves.length).toEqual(1);
            expect(moves[0].notation).toEqual("exf6");
        });
        it("should falsify wrong move numbers", function () {
            expect(function () { _validate("1. e4 e5 3. Nf3 Nc6 4. Bb5 a6", null); })
                .toThrow("Wrong move number for Nf3");
        });
        it("should understand wrong en passent", function () {
            // one en passent situation
            expect(function () { _validate("exd6", "rnbqkbnr/ppp1p1pp/8/3pPp2/8/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 3"); }).toThrow("Notation: exd6  not valid.");
        });
        it("should understand all kind of promotions", function () {
            // find a position with all kind of promotions possible
            moves = _validate("1. h8=Q b1=R 2. g8=B a1=N", "8/6PP/8/7K/k7/8/pp6/8 w - - 0 1");
            expect(moves[0].notation).toEqual("h8=Q");
            expect(moves[0].promotion).toEqual("Q");
            expect(moves[1].notation).toEqual("b1=R");
            expect(moves[1].promotion).toEqual("R");
            expect(moves[2].notation).toEqual("g8=B");
            expect(moves[2].promotion).toEqual("B");
            expect(moves[3].notation).toEqual("a1=N");
            expect(moves[3].promotion).toEqual("N");
        });
    }); // End of describe "PGN validate special moves"
}); // End of describe "PGN validate"
//# sourceMappingURL=validate-spec.js.map