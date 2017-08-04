// var StringBuilder = require('stringbuilder')
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// enum Row { r1, r2, r3, r4, r5, r6, r7, r8 }
// enum Column { a,b,c,d,e,f,g,h }
// enum Strike { x }
// enum Check { '+', '#' }
// enum Promotion { Q, R, B, N }
// enum Figure { K, Q, R, B, N, P}
// type Discriminator = Row | Column
/**
 * Base class for PGN Moves, contains all information that may be used later.
 *
 * @class PgnMove
 */
var PgnMove = (function () {
    function PgnMove(fig, col, row, notation, disc, strike, commentBefore, commentAfter, commentMove, previousMove, nags, check) {
        if (disc === void 0) { disc = null; }
        if (strike === void 0) { strike = null; }
        if (commentBefore === void 0) { commentBefore = ''; }
        if (commentAfter === void 0) { commentAfter = ''; }
        if (commentMove === void 0) { commentMove = ''; }
        if (nags === void 0) { nags = []; }
        this.variations = [];
        this.commentBefore = commentBefore;
        this.commentAfter = commentAfter;
        this.commentMove = commentMove;
        this.previousMove = previousMove;
        this.nags = nags;
        this.fig = fig;
        this.disc = disc;
        this.strike = strike;
        this.col = col;
        this.row = row;
        this.notation = notation;
        this.check = check;
    }
    /**
     * Builds a new chess move from the given parameters.Necessary as long as
     * parameter handling does not work for me.
     * @param params given object, given directly by parsing moves
     */
    PgnMove.buildMove = function (params) {
        var cm = new PgnMove(params.fig, params.col, params.row, params.notation, params.disc, params.strike, params.commentBefore, params.commentAfter, params.commentMove, params.previousMove, params.nags, params.check);
        return cm;
    };
    return PgnMove;
}());
exports.PgnMove = PgnMove;
//# sourceMappingURL=move.js.map