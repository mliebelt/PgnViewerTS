// var StringBuilder = require('stringbuilder')

// enum Row { r1, r2, r3, r4, r5, r6, r7, r8 }
// enum Column { a,b,c,d,e,f,g,h }
// enum Strike { x }
// enum Check { '+', '#' }
// enum Promotion { Q, R, B, N }
// enum Figure { K, Q, R, B, N, P}
// type Discriminator = Row | Column
class PgnMove {
    fig: string
    col: string
    row: string
    variations: PgnMove[] = []
    notation: string
    commentBefore: string
    commentAfter: string
    commentMove: string
    previousMove: PgnMove
    nextMove: PgnMove
    nags: string[]
    disc: string
    strike: string
    fen: string
    check: string
    moveNumber: number
    
    constructor(
        fig: string, col: string, row: string, notation: string,
        disc: string = null, strike: string = null,
        commentBefore='', commentAfter='', commentMove='',
        previousMove: PgnMove, nags: string[] =[], check: string
        ) {
            this.commentBefore = commentBefore
            this.commentAfter = commentAfter
            this.commentMove = commentMove
            this.previousMove = previousMove
            this.nags = nags
            this.fig = fig
            this.disc = disc
            this.strike = strike
            this.col = col
            this.row = row
            this.notation = notation
            this.check = check
        }
    
    /**
     * Builds a new chess move from the given parameters.Necessary as long as 
     * parameter handling does not work for me.
     * @param params given object, given directly by parsing moves
     */
    static buildMove(params:any): PgnMove {
        let cm = new PgnMove(params.fig, params.col, params.row,
        params.notation, params.disc, params.strike, params.commentBefore,
        params.commentAfter, params.commentMove, 
        params.previousMove, params.nags, params.check)
        return cm
    }
    // toString(): string {
    //     let sb = new StringBuilder()
    //     sb.append('PgnMove( ')
    //     sb.append("fig: ${this.fig} ")
    //     sb.append("row: ${this.row} ")
    //     sb.append("col: ${this.col} ")
    //     sb.append(')')
    //     return sb.build()
    // }

} export { PgnMove }