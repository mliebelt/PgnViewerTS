// <reference path='chess.js.d.ts' />
import { Chess } from 'chess.js'

describe("Show failing tests for chess.js", () => {
    

    it ("when needing disambiguration for pawn moves", () => {
        var chess = new Chess()
        var move
        move = chess.move("e4")
        expect(move).not.toBeNull()
        move = chess.move("d5")
        expect(move).not.toBeNull()
        move = chess.move("xd5")
        expect(move).not.toBeNull()
        //console.log(chess.ascii())
    })
    
    it ("when needing disambiguration for pawn moves", () => {
        var chess = new Chess()
        var move
        move = chess.move("e4")
        expect(move).not.toBeNull()
        move = chess.move("d5")
        expect(move).not.toBeNull()
        move = chess.move("exd5")
        expect(move).not.toBeNull()
        //console.log(chess.ascii())
    })
})