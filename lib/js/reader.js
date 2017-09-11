"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Typescript file for reading PGN (Portable Game Notation).
 */
/// <reference path='chess.js.d.ts' />
var chess_js_1 = require("chess.js");
var pgn_parser_1 = require("./pgn-parser");
var move_1 = require("./move");
var game_1 = require("./game");
/**
 * The PgnReader should be stateless and read from a given notation a PGN database.
 * It returns as result an array of PgnGame objects.
 */ /**
*
*
* @export
* @class PgnReader
*/
var PgnReader = (function () {
    function PgnReader() {
        this.chess = new chess_js_1.Chess();
    }
    /**
     * Parses the pgnString, and hopefully returns a correct array of moves.
     * No argument needed, the PGM pgnString is the part of the
     * configuration (see constructor)
     *
     * @returns {any[]} the array of moves
     *
     * @memberOf PGN
     */
    PgnReader.prototype.parsePgn = function (_string) {
        return pgn_parser_1.parse(_string, {})[0];
    };
    /**
    * Generates the moves from the PGN notation, that may be checked afterwards
    * by playing them on a board. Parses at the moment only the main line,
    * to expand later to the variations.
    */
    PgnReader.prototype.generateMoves = function (_string) {
        var parsedMoves = this.parsePgn(_string);
        var result = this.getResult(parsedMoves);
        var pgnMoves = [];
        this.generateLine(parsedMoves, pgnMoves);
        return new game_1.PgnGame(pgnMoves, null, result, _string);
    };
    /**
     * Checks if the notation contains a result (must be the last entry),
     * and removes that from the parsedMoves. Returns the result then, else null.
     *
     * @private
     * @param {any} parsedMoves the given (raw) moves from the parser
     * @returns the result (as string) or null
     *
     * @memberOf PgnReader
     */
    PgnReader.prototype.getResult = function (parsedMoves) {
        var len = parsedMoves.length;
        if ((len > 0) && (typeof parsedMoves[parsedMoves.length - 1] === 'string')) {
            return parsedMoves.pop();
        }
        return null;
    };
    /**
     * Generates one line of a chess game and returns the first move. This can be used in the
     * main algorithm, but as well in the creation of variations.
     *
     * @param {any} parsedMoves the original moves (array of objects)
     * @param {PgnMove[]} PgnMoves the resulting moves (may be already filled)
     * @returns {PgnMove} the first generated move (or null, if none included)
     *
     * @memberOf PgnReader
     */
    PgnReader.prototype.generateLine = function (parsedMoves, pgnMoves) {
        var resMove = null;
        var firstIndex = pgnMoves.length;
        var prevMove;
        for (var _i = 0, parsedMoves_1 = parsedMoves; _i < parsedMoves_1.length; _i++) {
            var move = parsedMoves_1[_i];
            // console.log(move)
            var cm = move_1.PgnMove.buildMove(move);
            if (prevMove) {
                cm.previousMove = prevMove;
                prevMove.nextMove = cm;
            }
            prevMove = cm;
            pgnMoves.push(cm);
            this.generateVariations(cm, move.variations, pgnMoves);
        }
        return pgnMoves.length > firstIndex ? pgnMoves[firstIndex] : null;
    };
    /**
     * Algorithm to generate variations. See `todo.md` for explanations.
     *
     * @private
     * @param {PgnMove} baseMove the move that is the base of the variations
     * @param {any} variations array of array of (original) moves
     * @param {PgnMove[]} allMoves resulting array of PgnMove
     *
     * @memberOf PGN
     */
    PgnReader.prototype.generateVariations = function (baseMove, variations, allMoves) {
        for (var _i = 0, variations_1 = variations; _i < variations_1.length; _i++) {
            var variation = variations_1[_i];
            var firstMove = this.generateLine(variation, allMoves);
            baseMove.variations.push(firstMove);
            firstMove.previousMove = baseMove.previousMove;
        }
    };
    /**
     * Validates the given moves, and changes them in place.
     * Throws an error if a move is not valid, with an expressive error message.
     * @param moves an array of PgnMove
     */
    PgnReader.prototype.validate = function (moves, startPosition) {
        // No moves, no validation
        if (moves.length === 0)
            return;
        if ((startPosition === undefined) || (startPosition === null)) {
            startPosition = this.defaultStartPosition();
        }
        for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
            var move = moves_1[_i];
            // Ensure that position before the move is setup
            if ((move.previousMove === null) || (move.previousMove === undefined)) {
                this.chess.load(startPosition);
            }
            else {
                this.chess.load(move.previousMove.fen);
            }
            // Try to make the move, if non-null result, it was successful
            var pgnMove = this.chess.move(move.notation, { sloppy: true });
            if (pgnMove) {
                move.fen = this.chess.fen();
                move.notation = pgnMove.san;
                var currentMoveNumber = PgnReader.getMoveNumberFromPosition(move.fen);
                if (move.moveNumber) {
                    if (move.moveNumber !== currentMoveNumber) {
                        throw "Wrong move number for " + move.notation;
                    }
                }
                move.moveNumber = currentMoveNumber;
                if (this.chess.in_check()) {
                    move.check = "+";
                }
                else if (this.chess.in_checkmate()) {
                    move.check = "#";
                }
                else {
                    move.check = '';
                }
                if ((pgnMove.flags == 'c') || (pgnMove.flags == 'e')) {
                    move.strike = 'x';
                }
                else {
                    move.strike = '';
                }
                this.checkNAGs(move);
                // let disam = this.chess.get_disambiguator(PgnMove, true)
                // move.disc = disam
            }
            else {
                // This is the edge case: something went wrong with the move, so next moves will fail (no FEN)
                throw "Notation: " + move.notation + "  not valid.";
            }
        }
    };
    PgnReader.prototype.defaultStartPosition = function () {
        this.chess.reset();
        return this.chess.fen();
    };
    PgnReader.prototype.checkNAGs = function (move) {
        if (move.nags === null) {
            throw "Move: " + move.notation + " has wrong format for NAGs: " + move.nags;
        }
        move.nags.forEach(function (element) {
            var numb = parseInt(element.slice(1));
            if (isNaN(numb)) {
                throw "NAG: " + element + " has not the right format.";
            }
            if (numb < 1) {
                throw "NAG: " + element + " number is too low. Minimum is 1.";
            }
            if (numb > 139) {
                throw "NAG: " + element + " number is too high. Maximum is 139.";
            }
        });
    };
    PgnReader.getMoveNumberFromPosition = function (fen) {
        var tokens = fen.split(/\s+/);
        var move_number = parseInt(tokens[5], 10);
        return (tokens[1] === 'b') ? move_number : move_number - 1;
    };
    PgnReader.getTurnFromPosition = function (fen) {
        var tokens = fen.split(/\s+/);
        return tokens[1];
    };
    return PgnReader;
}());
exports.PgnReader = PgnReader;
//# sourceMappingURL=reader.js.map