import { PgnMove } from "../Move"
import { PgnGame } from "../Game"
import { PgnReader } from '../Reader'

describe("Move handling", () => {
    let pgn: PgnReader
    let pgnResult: PgnMove[]
    function _parse(_pgn):PgnMove[] {
        pgn = new PgnReader()
        return pgn.parsePgn(_pgn)
    }

    beforeEach(() => {

    })

    it("should understand mmove read from pgn string", () => {
        pgnResult = _parse("1. e2 e4")
        expect(pgnResult.length).toEqual(2)
    })

    it ("should construct a move from PGN parsed", () => {
        pgnResult = _parse("1. e4")
        var cm = PgnMove.buildMove(pgnResult[0])
        // console.log(cm)
        expect(cm).not.toBeNull()
    })

    it ("should understand partial object to construct from", () => {
        var cm = PgnMove.buildMove({fig: 'Q', col: "e", row: '4'})
        expect(cm.row).toEqual('4')
        expect(cm.col).toEqual('e')
        expect(cm.fig).toEqual('Q')
    })

    it ("should understand parsed move", function() {
        pgnResult = _parse("1. fxe4")
        var cm = PgnMove.buildMove(pgnResult[0])
        // console.log(cm)
        expect(cm.row).toEqual('4')
        expect(cm.col).toEqual('e')
        expect(cm.disc).toEqual('f')
        expect(cm.strike).toEqual('x')        
    })

    it ("should understand 2 moves parsed", function() {
        pgnResult = _parse("1. e4 e5")
        var cm1 = PgnMove.buildMove(pgnResult[0])
        var cm2 = PgnMove.buildMove(pgnResult[1])
        cm2.previousMove = cm1
        expect(cm1.row).toEqual("4")
        expect(cm1.col).toEqual("e")
        expect(cm2.col).toEqual("e")
        expect(cm2.row).toEqual("5")
    })
})