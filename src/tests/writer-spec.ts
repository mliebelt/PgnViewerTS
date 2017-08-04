import { PgnGame } from '../game'
import { PgnMove } from '../move'
import { PgnWriter } from '../writer'
import { PgnReader } from '../reader'

describe ("Writing a PGN game", () => {
    // Ensure that whole games are created correctly
    // Moves are normally checked in a separate spec
    var writer: PgnWriter = new PgnWriter()
    function _gm(_pgn, _fen = null) {
        var pgn = new PgnReader()
        var game = pgn.generateMoves(_pgn)
        var moves = game.getMoves()
        pgn.validate(moves, _fen)
        return game
    }
    
    it ("should return one move for white", () => {
        var notation: string = writer.write(_gm("1. e4"))
        expect(notation).toEqual("1. e4")
    })

    it ("should return one move fro white and black", () => {
        var notation: string = writer.write(_gm("1. e4 1. e5"))
        expect(notation).toEqual("1. e4 e5")
    })

    it ("should return only one space between moves", () => {
        var notation: string = writer.write(_gm("1. e4  1. e5  2. Nf3    Nc6"))
        expect(notation).toEqual("1. e4 e5 2. Nf3 Nc6")
    })
})
