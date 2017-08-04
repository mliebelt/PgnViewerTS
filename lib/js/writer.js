"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reader_1 = require("./reader");
/**
 * The PgnWriter should be stateless and write one (or more) PGN games to a stream. This will be used to write later whole files
 * with one or more PGN games in it. 
 *
 * It may be possible to add later configuration parameters and use those parameters to define how the PGN should be written.
 * Examples could be: which tags to write (default no), which kind of notation, to include additional options (diagram print), ...
 *
 * @export
 * @class PgnWriter
 */
var PgnWriter = (function () {
    function PgnWriter() {
        // Left empty, for initialization if needed.
    }
    /**
     * Writes a pgn game as string. Will later be expanded by a configuration.
     * Ensure to fullfil the spec http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm, there
     * the sections: 3.2, 4, 8.1, 8.2,
     */
    PgnWriter.prototype.write = function (_game) {
        var s = "";
        s += this.writeTags(_game);
        s += this.writeMoves(_game);
        return s;
    };
    PgnWriter.prototype.writeTags = function (_game) {
        // Ignored for the moment
        return "";
    };
    PgnWriter.prototype.writeMoves = function (_game) {
        var s = "";
        for (var _i = 0, _a = _game.getMoves(); _i < _a.length; _i++) {
            var move = _a[_i];
            s += this.addWhitespaceIfNeeded(s);
            s += this.writeMove(move);
        }
        return s;
    };
    PgnWriter.prototype.writeMove = function (_move) {
        var s = "";
        s = s + this.writeCommentMove(_move, s);
        s = s + this.writeMoveNumber(_move, s);
        s = s + this.writeCommentBefore(_move, s);
        s = s + this.writeHalfMove(_move, s);
        s = s + this.writeNAGs(_move, s);
        s = s + this.writeCommentAfter(_move, s);
        s = s + this.writeVariations(_move, s);
        return s;
    };
    PgnWriter.prototype.writeCommentMove = function (_move, _string) {
        return "";
    };
    PgnWriter.prototype.writeCommentBefore = function (_move, _string) {
        return "";
    };
    PgnWriter.prototype.writeCommentAfter = function (_move, _string) {
        return "";
    };
    PgnWriter.prototype.writeMoveNumber = function (_move, _string) {
        var s = "";
        s = s + this.addWhitespaceIfNeeded(_string);
        var num = reader_1.PgnReader.getMoveNumberFromPosition(_move.fen);
        var turn = reader_1.PgnReader.getTurnFromPosition(_move.fen);
        //console.log("FEN: " + _move.fen)
        if (turn === 'b') {
            s = s + num + ".";
        }
        return s;
    };
    PgnWriter.prototype.writeHalfMove = function (_move, _string) {
        var s = "";
        s = s + this.addWhitespaceIfNeeded(_string);
        s = s + _move.notation;
        return s;
    };
    PgnWriter.prototype.writeNAGs = function (_move, _string) {
        return "";
    };
    PgnWriter.prototype.writeVariations = function (_move, _string) {
        return "";
    };
    PgnWriter.prototype.addWhitespaceIfNeeded = function (_string) {
        if (_string.length > 0) {
            return " ";
        }
        return "";
    };
    return PgnWriter;
}());
exports.PgnWriter = PgnWriter;
//# sourceMappingURL=writer.js.map
