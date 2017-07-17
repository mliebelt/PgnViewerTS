"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Typescript file for handling PGN (Portable Game Notation).
 */
/// <reference path='chessboard-0.3.0.d.ts' />
var ChessBoard = require("./chessboard-0.3.0.js");
// import parse = require("./pgn-parser")
// let pgnParser = parse.parse
// let SyntaxError = parse.SyntaxError
var PGNBase = (function () {
    /**
     * Creates a UI to PGN games. Empty for the moment, may be later filled with the
     * default configuration used in PGN viewer / board / editor / notation.
     *
     * @memberOf PGNBase
     */
    function PGNBase() {
    }
    /**
     * Dummy method to demonstrate that Chess could be used.
     */
    PGNBase.prototype.play = function () {
        console.log(ChessBoard);
    };
    return PGNBase;
}());
new PGNBase().play();
//# sourceMappingURL=pgnv.js.map