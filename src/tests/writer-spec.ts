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
    
    var notations = [
        {orig: "1. e4", target: "1. e4"},
        {orig: "1. e4 1. e5", target: "1. e4 e5"},
        {orig: "1. e4  1. e5  2. Nf3    Nc6", target: "1. e4 e5 2. Nf3 Nc6"},
        {orig: "1. e4 2. e5 3. Nf3 4. Nc6", target: "1. e4 e5 2. Nf3 Nc6"},
        {orig: "e4 e5 Nf3 Nc6", target: "1. e4 e5 2. Nf3 Nc6"},
        {orig: "e2-e4 e5 Ng1-f3 Nb8-c6", target: "1. e4 e5 2. Nf3 Nc6"},
    ]

    notations.forEach(function(notation, i) {
        it (i + " should understand notation: " + notation.orig, () => {
            var target: string = writer.write(_gm(notation.orig))
            expect(notation.target).toEqual(target)
        })
    })

})
