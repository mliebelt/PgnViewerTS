import { PgnGame } from '../Game'
import { PgnMove } from '../Move'
import { PgnReader } from '../Reader'

describe ("PGN generating an array of moves", () => {
    // only care about producing an array of moves
    let moves: PgnMove[]
    let pgn: PgnGame
    let reader: PgnReader
    function _generate(_pgn: string): PgnMove[] {
        reader = new PgnReader()
        pgn = reader.generateMoves(_pgn)
        return pgn.getMoves()
    }
    // place holder for all functionality that produces PGN
    it ("should parse main lines", () => {
        moves = _generate( '1. e4 e5 2. Nf3 Nc6')
        expect(moves.length).toEqual(4)
        expect(moves[0].notation).toEqual('e4')
        expect(moves[0].col).toEqual('e')
        expect(moves[0].row).toEqual('4')
    })

    it ("should have set nextMove and previousMode in moves",() => {
        moves = _generate( '1... e5 2. f4 exf4 3. Nf3')
        expect(moves.length).toEqual(4)
        for(let i = 0; i < 4; i++) {
            if (i !== 0) {
                expect(moves[i].previousMove).not.toBeNull()
                expect(moves[i].previousMove).toBe(moves[i-1])
            }
            if (i !== 3) {
                expect(moves[i].nextMove).not.toBeNull()
                expect(moves[i].nextMove).toBe(moves[i+1])
            }   
        }
    })

    it ("should have variations generated", () => {
        moves = _generate('1. e4 e5 (1... d5)')
        expect(moves.length).toEqual(3)
        expect(moves[0].notation).toEqual('e4')
        expect(moves[1].notation).toEqual('e5')
        expect(moves[1].variations[0].notation).toEqual('d5')
        expect(moves[1].variations[0].previousMove).toBe(moves[0])
        expect(moves[0].nextMove).toBe(moves[1])
        expect(moves[1].previousMove).toBe(moves[0])
    })

    it ("should read two variations", () => {
        moves = _generate("1. e4 e5 (1... d5) (1... c5)")
        expect(moves.length).toEqual(4)
        expect(moves[0].variations.length).toEqual(0)
        expect(moves[1].variations.length).toEqual(2)
        expect(moves[1].variations[0].notation).toEqual("d5")
        expect(moves[1].variations[1].notation).toEqual("c5")
        expect(moves[1].variations[1].previousMove).toBe(moves[0])
        expect(moves[1].variations[0].previousMove).toBe(moves[0])
    })

    it ("should read hierarchical variations", () => {
        moves = _generate("1. e4 e5 ( 1... d5 2. xd5 ( e5 ))")
        expect(moves.length).toEqual(5)
        expect(moves[0].variations.length).toEqual(0)
        expect(moves[1].variations.length).toEqual(1)
        expect(moves[2].variations.length).toEqual(0)
        expect(moves[3].variations.length).toEqual(1)
        expect(moves[4].variations.length).toEqual(0)
        expect(moves[1].variations[0].nextMove.variations.length).toEqual(1)
    })

    it ("should read complex games", () => {
        moves = _generate("1.e4 {Notes by Wilhelm Steinitz.} e6 {As is well known Steinitz never adopted this defense excepting in the present game where it had been agreed that the line of play which occurred in the first tie game of the Vienna tournament of 1882 between Steinitz (White) and Winawer (Black) should be followed by the two parties up to White's 14th move from which point McConnell claimed that the game could be won by White in a manner that had escaped the attention of all analysts who had commented on that game including the writer.} 2.e5 {This line of play was introduced by Steinitz in the above named tournament and was his favorite attack in this opening at that time.} f6 3.d4 c5 4.dxc5 Bxc5 5.Nc3 Qc7 {The attack here initiated gains material but too much at the expense of time and position. 5...Nc6 was superior.} 6.Bf4 {Obviously the loss of forces could be avoided by 6.exf6 but White prefers giving up virtually at this point the exchange of his pawns for an attack which ought to have succeeded by proper play.} Qb6 7.Qd2 {Only consistent with the previous play. 7.Nh3 Qxb2 8.Nb5 Bb4+ 9.Ke2 Na6 10.Rb1 Qxa2 11.Rxb4 Nxb4 12.Nc7+ was not as good although White wins a piece temporarily for his knight becomes immediately subject to loss by ...b6 which also opens measures against White's king.} Bxf2+ 8.Qxf2 Qxb2 9.Kd2 {Natural enough as any attempt to save the rook would have left Black with two pawns ahead and a comparatively very easy game.} Qxa1 10.Nb5 {To all appearances the most direct route to be successful but the bad position of Blacks queen and his exposed kingside might have been also utilized in other ways for instance by 10.Qg3 with the following interesting possibilities: 10...Qxf1 (or 10...g5 11.exf6 Nxf6 best; [if 11...gxf4 12.Qg4 threatening f7+] 12.Bxb8 Qxc3+ 13.Qxc3 Ne4+ 14.Ke1 Nxc3 15.Be5 and wins) 11.Nge2 Qxh1 12.Qxg7 Nc6 13.Nb5 Nxe5 (if 13...fxe5 14.Bg5 and wins) 14.Nd6+ Kd8 15.Qf8+ Kc7 16.Ne8+ and wins in a few moves.} Na6 11.Nd6+ Kf8 12.Bxa6 bxa6 13.Qc5 Ne7 14.exf6 {In the game above referred to White here played 14.Ne2 and after 14...Qxh1 15.exf6 gxf6 16.Bh6+ Kg8 17.Qd4. This last move was a fatal error as Blacks answer 18...Qxh2 showed. However McConnells ingenious plan disguised this point. The late Zukertort who saw this game played had strongly expressed the opinion that Black had a winning position at this juncture and for my part I am inclined to think that Black ought not lose at any rate. The result of this game and the examination of the variations arising therefrom convinced me however that McConnell's idea was as sound as it was deep and clever.} gxf6 {If 14...Qxf6 15.Bg5 Qf1 (or 15...Qg6 16.Ne2 h6 17.Rf1+ Kg8 18.Bxe7 Kh7 there seems nothing better 19.Nf4 Qg4 20.h3 Qg3 21.Rf3 with a winning game. This variation was pointed out to me by McConnell) 16.Ne4 Qxg2+ 17.Ne2 h6 18.Qxe7+ Kg8 19.Qe8+ Kh7 20.Nf6+ gxf6 21.Qf7#.} 15.Bh6+ Kg8 16.h4 {A remarkably fine move which forms the root of a variety of combinations demonstrating the winning superiority of Whites position although Black is the exchange and two pawns ahead and can force the exchange of queens.} Qe5 {The Black king is so dangerously surrounded the exchange of queens seems the only relief. Other feasible moves provided however no better result for instance 16...f5 17.Rh3 Qf6 18.Bg5 Qg7 19.Rg3. Or 16...Ng6 17.Rh3 Qe5 18.Qxe5 fxe5 19.h5 and wins.} 17.Qxe5 fxe5 18.g4 {This precaution is most important in order not to allow the Black knight to enter at f5 which would break Whites attack. This had to be provided for in the forecast of the combinations which formed White's plan and is therefore all the more murderous.} Rb8 {No better was 18...Nd5 19.Nh3 Nf4 (or 19...Nf6 20.Rf1 Nxg4 21.Rg1 and wins) 20.Rf1 Nxh3 21.Rf7 and the mating position which appears at the end of this game is now produced although White is a clear rook behind.} 19.Nh3 {The details of Whites plan are carried out with great foresight, it is necessary to select this plan for the development of the knight in order to prevent Black from blocking the f-file subsequently by ...Nf4.} Bb7 20.Rf1 Bg2 {20...Bd5 might have prolonged the fight a little but the game could not be saved. White would then equally play 21.Rf7 followed by Ng5 and then with a series of checks his rook would reach c7 in which situation the battle would be decided by Nc8 preventing ...Rxc8 as well as to reach e8 with the rook after a series of checks.} 21.Rf7 Ng6 {Mate in 6. A pretty so called seesaw of checks finishes the game thus 22.Rg7+ Kf8 23.Rxd7+ Kg8 24.Rg7+ Kf8 25.Rb7+ Kg8 26.Rxb8+ and mates next moves.} 1-0")
    })

    it ("should read mix of comments and variations", () => {
        moves = _generate("e4 { include here a variation (d4 d5) could be played (and that comment should be ignored) } e5")
        expect(moves.length).toEqual(2)
        expect(moves[0].variations.length).toEqual(0)
        expect(moves[1].variations.length).toEqual(0)
    })

    it ("should ignore result of game as move and hold as result", () => {
        moves = _generate("e4 1:0")
        expect(moves.length).toEqual(1)
        //console.log(pgn)
        expect(pgn.result).toEqual("1:0")
    })
})