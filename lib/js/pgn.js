"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base Typescript file for handling PGN (Portable Game Notation).
 */
/// <reference path='pgn-parser.d.ts' />
var Chess_Array = require("chess.js");
var Chess = Chess_Array.Chess;
var parse = require("./pgn-parser");
var pgnParser = parse.parse;
var SyntaxError = parse.SyntaxError;
var PGN = (function () {
    /**
     * Creates an instance of PGN. Empty for the moment, may be later filled with the
     * default configuration used in PGN.
     * @param config a hash with all parameters given
     * @memberOf PGN
     */
    function PGN(config) {
        if (config.pgn !== undefined) {
            this.pgnString = config.pgn;
        }
    }
    /**
     * Dummy method to demonstrate that Chess could be used.
     */
    PGN.prototype.play = function () {
        console.log("Standard your position: " + new Chess().fen());
        console.log(pgnParser);
        console.log(SyntaxError);
    };
    PGN.prototype.getPgnString = function () {
        return this.pgnString;
    };
    /**
     *
     * @param pgn
     */ /**
   * Parses the pgnString, and hopefully returns a correct array of moves. No argument needed, the PGM pgnString is the part of the configuration (see constructor)
   *
   * @returns {any[]} the array of moves
   *
   * @memberOf PGN
   */
    PGN.prototype.parse = function () {
        return pgnParser(this.pgnString, {})[0];
    };
    return PGN;
}());
exports.PGN = PGN;
// new PGN().play()
//# sourceMappingURL=pgn.js.map 
//# sourceMappingURL=pgn.js.map