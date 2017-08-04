/**
 * Base Typescript file for writing PGN (Portable Game Notation).
 */
/// <reference path='chess.js.d.ts' />
import { PgnMove } from "./move"
import { PgnGame } from './game'
import { PgnReader } from './reader'

/**
 * The PgnWriter should be stateless and write one (or more) PGN games to a stream. This will be used to write later whole files
 * with one or more PGN games in it.
 * 
 * It may be possible to add later configuration parameters and use those parameters to define how the PGN should be written.
 * Examples could be: which tags to write (default no), which kind of notation, to include additional options (diagram print), ...
 * 
 * @export
 * @class PgnWriter
 */
export class PgnWriter {
    
    constructor() {
        // Left empty, for initialization if needed.
    }

    /**
     * Writes a pgn game as string. Will later be expanded by a configuration.
     * Ensure to fullfil the spec http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm, there
     * the sections: 3.2, 4, 8.1, 8.2, 
     */
    public write(_game) {
        var s: string = ""
        s += this.writeTags(_game)
        s += this.writeMoves(_game)
        return s
    }

    private writeTags(_game) {
        // Ignored for the moment
        return ""
    }

    private writeMoves(_game) {
        var s: string = ""
        for (let move of _game.getMoves()) {
            s += this.addWhitespaceIfNeeded(s)
            s += this.writeMove(move)
        }
        return s
    }

    private writeMove(_move) {
        var s: string = ""
        s = s + this.writeCommentMove(_move, s)
        s = s + this.writeMoveNumber(_move, s)
        s = s + this.writeCommentBefore(_move, s)
        s = s + this.writeHalfMove(_move, s)
        s = s + this.writeNAGs(_move, s)
        s = s + this.writeCommentAfter(_move, s)
        s = s + this.writeVariations(_move, s)
        return s
    }

    private writeCommentMove(_move, _string) {
        return ""
    }
    private writeCommentBefore(_move, _string) {
        return ""
    }
    private writeCommentAfter(_move, _string) {
        return ""
    }
    private writeMoveNumber(_move, _string) {
        var s: string = ""
        s = s + this.addWhitespaceIfNeeded(_string)
        var num = PgnReader.getMoveNumberFromPosition(_move.fen)
        var turn = PgnReader.getTurnFromPosition(_move.fen)
        //console.log("FEN: " + _move.fen)
        if (turn === 'b') {
            s = s + num + "."
        }
        return s
    }
    private writeHalfMove(_move, _string) {
        var s: string = ""
        s = s + this.addWhitespaceIfNeeded(_string)
        s = s + _move.notation
        return s
    }
    private writeNAGs(_move, _string) {
        return ""
    }
    private writeVariations(_move, _string) {
        return ""
    }

    private addWhitespaceIfNeeded(_string) {
        if (_string.length > 0) {
            return " "
        }
        return ""
    }

}
