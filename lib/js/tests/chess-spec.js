"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// <reference path='chess.js.d.ts' />
var chess_js_1 = require("chess.js");
describe("Show non-failing tests for forked chess.js", function () {
    it("when not disambiguration for pawn moves in sloppy mode", function () {
        var chess = new chess_js_1.Chess();
        var move;
        move = chess.move("e4");
        expect(move).not.toBeNull();
        move = chess.move("d5");
        expect(move).not.toBeNull();
        move = chess.move("xd5", { sloppy: true });
        expect(move).not.toBeNull();
        //console.log(chess.ascii())
    });
    it("when needing disambiguration for pawn moves in strict mode", function () {
        var chess = new chess_js_1.Chess();
        var move;
        move = chess.move("e4");
        expect(move).not.toBeNull();
        move = chess.move("d5");
        expect(move).not.toBeNull();
        move = chess.move("exd5");
        expect(move).not.toBeNull();
        //console.log(chess.ascii())
    });
    it("when allowing unnecessary disambiguattion in strict mode", function () {
        var chess = new chess_js_1.Chess();
        var move;
        move = chess.move("Ngf3");
        expect(move).toBeNull();
    });
    it("when allowing unnecessary disambiguattion in sloppy mode", function () {
        var chess = new chess_js_1.Chess();
        var move;
        move = chess.move("Ngf3", { sloppy: true });
        expect(move).not.toBeNull();
    });
});
//# sourceMappingURL=chess-spec.js.map