"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Typescript file for handling PGN (Portable Game Notation).
 */
/// <reference path='chess.js.d.ts' />
var chess_js_1 = require("chess.js");
var PgnGame = (function () {
    /**
     * Creates an instance of PgnGame. Is constructed normally be the PgnReader.
     * @param config a hash with all parameters given
     * @memberOf PGN
     *
     */
    function PgnGame(pgnMoves, startPosition, result, pgnString) {
        this.chess = new chess_js_1.Chess();
        this.pgnString = pgnString;
        this.pgnMoves = pgnMoves;
        this.result = result;
        if (pgnString !== undefined) {
            this.pgnString = pgnString;
        }
        if ((startPosition === undefined) || (startPosition === null)) {
            this.chess.reset();
            this.startPosition = this.chess.fen();
        }
        else {
            this.startPosition = startPosition;
            this.chess.load(this.startPosition);
        }
    }
    /**
     * Returns the pgnString. Needed for debugging purpose (only?).
     * @returns the original PGN string
     *
     * @memberOf PGN
     */
    PgnGame.prototype.getPgnString = function () {
        return this.pgnString;
    };
    /**
     * Returns the moves of the game.
     */
    PgnGame.prototype.getMoves = function () {
        return this.pgnMoves;
    };
    /**
     * getResult returns the result of the game (if any)
     */
    PgnGame.prototype.getResult = function () {
        return this.getResult;
    };
    return PgnGame;
}());
exports.PgnGame = PgnGame;
//# sourceMappingURL=game.js.map
