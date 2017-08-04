import { PgnGame } from '../game'
import { PgnMove } from '../move'
import { PgnReader } from '../reader'

describe ("PGN check games produced correct", () => {
    // Ensure that whole games are created correctly
    // Moves are normally checked in a separate spec
    let moves: PgnMove[]
    let game: PgnGame
    var pgn: PgnReader
    function _validate(_pgn, _fen) {
        pgn = new PgnReader()
        game = pgn.generateMoves(_pgn)
        moves = game.getMoves()
        pgn.validate(moves, _fen)
        return game
    }

    describe ("should ensure correct nummber", () => {
        it("if missing", () => {
            _validate('e4 e5', null)
            expect(moves.length).toEqual(2)
            expect(moves[0].moveNumber).toEqual(1)
            expect(moves[1].moveNumber).toEqual(1)
        })

        it ("from any position", () => {
            _validate("Re1 d5",             "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 6")
            expect(moves.length).toEqual(2)
            expect(moves[0].moveNumber).toEqual(6)
            expect(moves[1].moveNumber).toEqual(6)
        })

        it ("over more moves", () => {
            _validate("Nxe4 5.d4 exd4 6.Re1 d5", "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4")
            expect(moves.length).toEqual(5)
            expect(moves[0].moveNumber).toEqual(4)
            expect(moves[1].moveNumber).toEqual(5)
            expect(moves[2].moveNumber).toEqual(5)
            expect(moves[3].moveNumber).toEqual(6)
            expect(moves[4].moveNumber).toEqual(6)
        })

        it("in variations", () => {
            _validate("e4 e5 (d5)", null)
            expect(moves.length).toEqual(3)
            expect(moves[0].moveNumber).toEqual(1)
            expect(moves[1].moveNumber).toEqual(1)
            expect(moves[2].moveNumber).toEqual(1)
        })

        
        // TODO Why is the dicscriminator needed her? See
        // http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm#c8.2.3
        // why this should not be necessary (but allowed) ...
        it("if missing in variations", () => {
            _validate("1. e4 e5 (d5 d4 dxe4)", null)
            expect(moves.length).toEqual(5)
            expect(moves[2].moveNumber).toEqual(1)
            expect(moves[3].moveNumber).toEqual(2)
            expect(moves[4].moveNumber).toEqual(2)
        })

        it("with mixed format of move numbers in variations", ()  => {
            _validate("1. e4 e5 (1... d5 d4 2 dxe4)", null)
            expect(moves.length).toEqual(5)
            expect(moves[2].moveNumber).toEqual(1)
            expect(moves[3].moveNumber).toEqual(2)
            expect(moves[4].moveNumber).toEqual(2)
        })
    })
    

    // Disambiguration
    it ("should need disambiguation where necessary", () => {
        _validate("Nbd7", "rnbqkb1r/ppp2ppp/3p1n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 4")
        expect(moves.length).toEqual(1)
        expect(moves[0].notation).toEqual("Nbd7")
    })
}) // End of PGN check games produced correct