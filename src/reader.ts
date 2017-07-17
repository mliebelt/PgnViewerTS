/**
 * Base Typescript file for reading PGN (Portable Game Notation).
 */
/// <reference path='chess.js.d.ts' />
import { Chess } from 'chess.js'
import { parse } from "./pgn-parser"
import { PgnMove } from "./Move"
import { PgnGame } from './Game'

/**
 * The PgnReader should be stateless and read from a given notation a PGN database.
 * It returns as result an array of PgnGame objects.
 *//**
 * 
 * 
 * @export
 * @class PgnReader
 */
export class PgnReader {
    chess: Chess;

    constructor() {
        this.chess = new Chess()
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
    public parsePgn(_string): any[] {
        return parse(_string, {})[0]
    }

     /**
     * Generates the moves from the PGN notation, that may be checked afterwards
     * by playing them on a board. Parses at the moment only the main line,
     * to expand later to the variations.
     */
    public generateMoves(_string): PgnGame {
        let parsedMoves = this.parsePgn(_string)
        let result = this.getResult(parsedMoves)
        let pgnMoves: PgnMove[] = []
        this.generateLine(parsedMoves, pgnMoves)
        return new PgnGame(pgnMoves, null, result, _string)
    }

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
    private getResult(parsedMoves): string {
        let len = parsedMoves.length
        if ( (len > 0) && (typeof parsedMoves[parsedMoves.length-1] === 'string') ) {
            return parsedMoves.pop()
        }
        return null
    }

    /**
     * Generates one line of a chess game and returns the first move. This can be used in the 
     * main algorithm, but as well in the creation of variations.
     * 
     * @param {any} parsedMoves the original moves (array of objects)
     * @param {PgnMove[]} PgnMoves the resulting moves (may be already filled)
     * @returns {PgnMove} the first generated move (or null, if none included)
     * 
     * @memberOf PGN
     */
    private generateLine(parsedMoves, pgnMoves: PgnMove[]): PgnMove {
        let resMove: PgnMove = null
        let firstIndex: number = pgnMoves.length
        let prevMove: PgnMove
        for (let move of parsedMoves) {
            // console.log(move)
            let cm = PgnMove.buildMove(move)
            if (prevMove) {
                cm.previousMove = prevMove
                prevMove.nextMove = cm
            }
            prevMove = cm
            pgnMoves.push(cm)
            this.generateVariations(cm, move.variations, pgnMoves)
        }
        return pgnMoves.length > firstIndex ? pgnMoves[firstIndex] : null
    }

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
    private generateVariations(baseMove: PgnMove, variations, allMoves: PgnMove[]): void {
        for(let variation of variations) {
            let firstMove = this.generateLine(variation, allMoves)
            baseMove.variations.push(firstMove)
            firstMove.previousMove = baseMove.previousMove
        }
    }

    /**
     * Validates the given moves, and changes them in place.
     * Throws an error if a move is not valid, with an expressive error message.
     * @param moves an array of PgnMove
     */
    public validate(moves: PgnMove[], startPosition: string): void {
        // No moves, no validation
        if (moves.length === 0) return
        if ( (startPosition === undefined) || (startPosition === null) ) {
            startPosition = this.defaultStartPosition()
        }
        try {
            throw "Just to catch"
        } catch(err) {
            // Continue
        }

        for(let move of moves) {
            // Ensure that position before the move is setup
            if ( (move.previousMove === null) || (move.previousMove === undefined) ) {
                this.chess.load(startPosition)
            } else {
                this.chess.load(move.previousMove.fen)
            }
            // Try to make the move, if non-null result, it was successful
            let PgnMove = this.chess.move(move.notation, {sloppy: true})
            if (PgnMove) {
                move.fen = this.chess.fen()
                move.notation = PgnMove.san
                var currentMoveNumber = PgnReader.getMoveNumberFromPosition(move.fen)
                move.moveNumber = currentMoveNumber
                if (this.chess.in_check()) {
                    move.check = "+"
                } else if (this.chess.in_checkmate()) {
                    move.check = "#"
                } else {
                    move.check = ''
                }
                if ( (PgnMove.flags == 'c') || (PgnMove.flags == 'e') ) {
                    move.strike = 'x'
                } else {
                    move.strike = ''
                }
                // let disam = this.chess.get_disambiguator(PgnMove, true)
                // move.disc = disam
            } else {
                // This is the edge case: something went wrong with the move, so next moves will fail (no FEN)
                throw "Notation: " + move.notation + "  not valid."
            }
        }
    }

    private defaultStartPosition() {
        this.chess.reset()
        return this.chess.fen()
    }

    private static getMoveNumberFromPosition(fen) {
        var tokens = fen.split(/\s+/)
        var move_number = parseInt(tokens[5], 10)
        return (tokens[1] === 'b') ? move_number : move_number - 1
    }

    private static getTurnFromPosition(fen) {
        var tokens = fen.split(/\s+/)
        return tokens[1]
    }

}