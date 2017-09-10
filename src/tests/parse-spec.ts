import { PgnReader } from '../reader'

describe("PGN parsing", () => {
    let reader: PgnReader
    let pgnResult
    function _parse(_pgn) {
        reader = new PgnReader()
        return reader.parsePgn(_pgn)
    }

    beforeEach(() => {

    })
    describe("moves", () => {
        // Shows the minimal set of values included in every move
        it ("should parse a short pgn string with one move only", () => {
            pgnResult = _parse("1. e4")
            // console.log(JSON.stringify(pgnResult[0]))
            expect(pgnResult.length).toEqual(1)
            expect(pgnResult[0].moveNumber).toEqual(1)
            expect(pgnResult[0].notation).toEqual("e4")
            expect(pgnResult[0].row).toEqual("4")
            expect(pgnResult[0].col).toEqual("e")
            expect(pgnResult[0].turn).toEqual("w")
            expect(pgnResult[0].variations.length).toEqual(0)
        })

        it ("should parse a main line with 6 moves", () => {
            pgnResult = _parse("1. e4 e5 2. Nf3 Nc6 3. Bb5 a6")
            expect(pgnResult.length).toEqual(6)
        })

        it ("should work with all kind of numbers (even nonsense ones, but syntactically correct)", () => {
            pgnResult = _parse("1. e4 2. e6 2. Nf4 1... Nc7")
            expect(pgnResult.length).toEqual(4)
        })

    })

    describe("NAGs", () => {
        // NAG section
        it ("should accept some NAGs divided by spaces", () =>  {
            pgnResult = _parse("1. e4 ? !")
            // console.log(pgnResult[0])
            expect(pgnResult[0].nag.length).toEqual(2)
        })

        it ("should accept NAGs not divided by spaces", () => {
            pgnResult = _parse("1. e4 ∞=??")
            expect(pgnResult[0].nag.length).toEqual(3)
        })
        
        it ("should accept NAGs in $-notation", () => {
            pgnResult = _parse("1. e4 $1 $2 $3 $4 $5 $6")
            expect(pgnResult[0].nag.length).toEqual(6)
        })
        
        it ("should accept NAGs in $-notation with and without spaces", () => {
            pgnResult = _parse("1. e4 $1$2 $3$4$5 $6")
            expect(pgnResult[0].nag.length).toEqual(6)
        })
        
        it ("should map NAGs in normal notation to $-notation", () => {
            pgnResult = _parse("1. e4 ! ? !! ?? !? ?! = ∞")
            expect(pgnResult[0].nag.length).toEqual(8)
            expect(pgnResult[0].nag[0]).toBe('$1')
            expect(pgnResult[0].nag[1]).toBe('$2')
            expect(pgnResult[0].nag[2]).toBe('$3')
            expect(pgnResult[0].nag[3]).toBe('$4')
            expect(pgnResult[0].nag[4]).toBe('$5')
            expect(pgnResult[0].nag[5]).toBe('$6')
            expect(pgnResult[0].nag[6]).toBe('$10')
            expect(pgnResult[0].nag[7]).toBe('$13')
        })

        it ("should accept NAGs not divided by spaces mixed with ones divided by spaces", () => {
            pgnResult = _parse("1. e4 ∞=?? ?")
            // console.log(pgnResult[0].nag)
            expect(pgnResult[0].nag.length).toEqual(4)
        })
    })
    
    describe("comments", () => {
        it ("should show all possible comments of one move", () => {
            pgnResult = _parse("{ com1 } 1. { com2 } N1xf3+ ? { com3 }")
            expect(pgnResult.length).toEqual(1)
            expect(pgnResult[0].commentBefore).toEqual("com2")
            expect(pgnResult[0].commentAfter).toEqual("com3")
            expect(pgnResult[0].commentMove).toEqual("com1")
        })    
    })
    
    describe("check and checkmate", () => {
        // Chess and mate marks
        it ("should accept chess marks", () => {
            pgnResult = _parse("e4+ e5#")
            // console.log(pgnResult[0])
            expect(pgnResult.length).toEqual(2)
            expect(pgnResult[0].check).toEqual("+")
            expect(pgnResult[1].check).toEqual("#")
        })
    })

    describe("variations", () => {
        // Variations
        it ("should read variations", () => {
            pgnResult = _parse("1. e4 e5 (1... d5 2. exd5) (1... c5 2. c3)")
            expect(pgnResult.length).toEqual(2) // main line moves
            expect(pgnResult[1].variations.length).toEqual(2) // 2nd move 2 variations
            expect(pgnResult[1].variations[0][0].notation).toEqual("d5")
            expect(pgnResult[1].variations[0][1].notation).toEqual("exd5")
            expect(pgnResult[1].variations[1][0].notation).toEqual("c5")
            expect(pgnResult[1].variations[1][1].notation).toEqual("c3")
        })

        it ("should read hierarchical variations", () => {
            pgnResult = _parse("1. e4 e5 ( 1... d5 2. exd5 ( 2. e5 ))")
            expect(pgnResult.length).toEqual(2)
            expect(pgnResult[1].variations.length).toEqual(1)
            expect(pgnResult[1].variations[0][0].notation).toEqual("d5")
            expect(pgnResult[1].variations[0][1].notation).toEqual("exd5")
            expect(pgnResult[1].variations[0][1].variations[0][0].notation).toEqual("e5")
        })

        it ("should read hierarchical variations without move number", () => {
            pgnResult = _parse("1. e4 e5 ( 1... d5 2. exd5 ( e5 ))")
            expect(pgnResult.length).toEqual(2)
            expect(pgnResult[1].variations.length).toEqual(1)
            expect(pgnResult[1].variations[0][0].notation).toEqual("d5")
            expect(pgnResult[1].variations[0][1].notation).toEqual("exd5")
            expect(pgnResult[1].variations[0][1].variations[0][0].notation).toEqual("e5")
        })
    })

    describe("results", () => {
        // Reading results
        it ("should read games with result", () => {
            pgnResult = _parse("1. e4 1-0")
            expect(pgnResult.length).toEqual(2)
            //console.log(pgnResult)
            expect(pgnResult[1]).toEqual('1-0')
        })
    })

    describe("move numbers", () => {
        // Reading move numbers
        it ("should understand no move number in pgn", () => {
            pgnResult = _parse("e4 e5")
            expect(pgnResult.length).toEqual(2)
        })

        it ("should understand numbers with white space", () => {
            pgnResult = _parse("1 . e4 e5")
            expect(pgnResult.length).toEqual(2)
        })

        it ("should understand more numbers anywhere", () => {
            pgnResult = _parse("1... e4 1.. e5 2...... d4 d5 3.. c4 3 c5")
            expect(pgnResult.length).toEqual(6)
        })
    })

    describe("disabmbiguation", () => {
        // Disabmbiguation
        it ("should understand disambiguation", () => {
            pgnResult = _parse("e4 d5 d4 exd4")
            expect(pgnResult.length).toEqual(4)
        })

        it ("should allow pawn moves with no disambiguation", () => {
            pgnResult = _parse("e4 d5 d4 xd4")
            expect(pgnResult.length).toEqual(4)
        })

        it ("should allow knight moves with unnecessary disambiguation", () => {
            pgnResult = _parse("e4 d5 Ngf3 Nbc6")
            expect(pgnResult.length).toEqual(4)
        })
    })

    describe("strange formats", () => {
        it("should understand long notation", () => {
            pgnResult = _parse("e2-e4 d7-d6 d2-d4 Ng8-f6 Nb1-c3")
            expect(pgnResult.length).toEqual(5)
            expect(pgnResult[0].notation).toEqual("e2-e4")
            expect(pgnResult[1].notation).toEqual("d7-d6")
        })

        it ("should understand long notation without dash", () => {
            pgnResult = _parse("e2e4 d7d6 d2d4 g8f6 b1c3")
            expect(pgnResult.length).toEqual(5)
            expect(pgnResult[0].notation).toEqual("e2-e4")
            expect(pgnResult[1].notation).toEqual("d7-d6")
            expect(pgnResult[3].notation).toEqual("g8-f6")
            expect(pgnResult[4].notation).toEqual("b1-c3")
        })
    })

    describe("special moves", () => {
        xit("should understand castling", () => {
            // have both short and long castling notations
        })

        xit("should understand promotions", () => {
            // understand all kind of promotions
        })
    })
})
