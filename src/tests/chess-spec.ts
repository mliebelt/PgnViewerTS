// <reference path='chess.js.d.ts' />
import { Chess } from 'chess.js'

describe("Show non-failing tests for forked chess.js", () => {
    

    it ("when not disambiguration for pawn moves in sloppy mode", () => {
        var chess = new Chess()
        var move
        move = chess.move("e4")
        expect(move).not.toBeNull()
        move = chess.move("d5")
        expect(move).not.toBeNull()
        move = chess.move("xd5", {sloppy: true})
        expect(move).not.toBeNull()
        //console.log(chess.ascii())
    })
    
    it ("when needing disambiguration for pawn moves in strict mode", () => {
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

    it ("when allowing unnecessary disambiguattion in strict mode", () => {
        var chess = new Chess()
        var move
        move = chess.move("Ngf3")
        expect(move).toBeNull()
    })

    it ("when allowing unnecessary disambiguattion in sloppy mode", () => {
        var chess = new Chess()
        var move
        move = chess.move("Ngf3", {sloppy: true})
        expect(move).not.toBeNull()
    })
})