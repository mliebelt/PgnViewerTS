"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for PGN Moves, contains all information that may be used later.
 *
 * @class PgnMove
 */
var PgnMove = (function () {
    function PgnMove(fig, col, row, notation, disc, strike, moveNumber, promotion, commentBefore, commentAfter, commentMove, previousMove, nags, check) {
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
        this.moveNumber = moveNumber;
        this.promotion = promotion;
        if (this.nags === null) {
            this.nags = [];
        }
    }
    /**
     * Builds a new chess move from the given parameters.Necessary as long as
     * parameter handling does not work for me.
     * @param params given object, given directly by parsing moves
     */
    PgnMove.buildMove = function (params) {
        var cm = new PgnMove(params.fig, params.col, params.row, params.notation, params.disc, params.strike, params.moveNumber, params.promotion, params.commentBefore, params.commentAfter, params.commentMove, params.previousMove, params.nag, params.check);
        return cm;
    };
    return PgnMove;
}());
exports.PgnMove = PgnMove;
//# sourceMappingURL=move.js.map