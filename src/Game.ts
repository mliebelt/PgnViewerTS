/**
 * Base Typescript file for handling PGN (Portable Game Notation).
 */
/// <reference path='chess.js.d.ts' />
import { Chess } from 'chess.js'
import { parse } from "./pgn-parser"
import { PgnMove } from "./move"

export class PgnGame {  
    startPosition: string;
    result: string;
    config: Object
    pgnString: string

    pgnMoves: PgnMove[]

    chess: Chess
    /**
     * Creates an instance of PgnGame. Is constructed normally be the PgnReader.
     * @param config a hash with all parameters given
     * @memberOf PGN
     * 
     */
    constructor(pgnMoves: PgnMove[], startPosition: string, result: string, pgnString: string) {
        this.chess = new Chess()
        this.pgnString = pgnString
        this.pgnMoves = pgnMoves
        this.result = result
        if (pgnString !== undefined) {
            this.pgnString = pgnString
        }
        if ( (startPosition === undefined) || (startPosition === null) ) {
            this.chess.reset()
            this.startPosition = this.chess.fen()
        } else {
            this.startPosition = startPosition
            this.chess.load(this.startPosition)
        }
    }

   /**
    * Returns the pgnString. Needed for debugging purpose (only?).
    * @returns the original PGN string
    * 
    * @memberOf PGN
    */
    public getPgnString() {
        return this.pgnString
    }

    /**
     * Returns the moves of the game.
     */
    public getMoves() {
        return this.pgnMoves
    }

    /**
     * getResult returns the result of the game (if any)
     */
    public getResult() {
        return this.getResult
    }

}