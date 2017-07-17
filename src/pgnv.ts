/**
 * Base Typescript file for handling PGN (Portable Game Notation).
 */
/// <reference path='chessboard-0.3.0.d.ts' />
import ChessBoard = require('./chessboard-0.3.0.js')

// import parse = require("./pgn-parser")
// let pgnParser = parse.parse
// let SyntaxError = parse.SyntaxError

 class PGNBase {
    /**
     * Creates a UI to PGN games. Empty for the moment, may be later filled with the
     * default configuration used in PGN viewer / board / editor / notation.
     * 
     * @memberOf PGNBase
     */
    constructor() {}

   
    /**
     * Dummy method to demonstrate that Chess could be used.
     */    
    public play(): void {
         console.log(ChessBoard)
    }
}
new PGNBase().play()
