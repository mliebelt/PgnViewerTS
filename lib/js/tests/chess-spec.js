"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// <reference path='chess.js.d.ts' />
var chess_js_1 = require("chess.js");
describe("Show failing tests for chess.js", function () {
    it("when needing disambiguration for pawn moves", function () {
        var chess = new chess_js_1.Chess();
        var move;
        move = chess.move("e4");
        expect(move).not.toBeNull();
        move = chess.move("d5");
        expect(move).not.toBeNull();
        move = chess.move("xd5");
        expect(move).not.toBeNull();
        //console.log(chess.ascii())
    });
    it("when needing disambiguration for pawn moves", function () {
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
});
//# sourceMappingURL=chess-spec.js.map