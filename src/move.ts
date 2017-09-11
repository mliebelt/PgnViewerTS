/**
 * Base class for PGN Moves, contains all information that may be used later.
 * 
 * @class PgnMove
 */
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
    promotion: string
    
    constructor(
        fig: string, col: string, row: string, notation: string,
        disc: string = null, strike: string = null, moveNumber: number, promotion: string,
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
            this.moveNumber = moveNumber
            this.promotion = promotion
        }
    
    /**
     * Builds a new chess move from the given parameters.Necessary as long as 
     * parameter handling does not work for me.
     * @param params given object, given directly by parsing moves
     */
    static buildMove(params:any): PgnMove {
        let cm = new PgnMove(params.fig, params.col, params.row,
        params.notation, params.disc, params.strike, params.moveNumber, params.promotion,
        params.commentBefore, params.commentAfter, params.commentMove, 
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