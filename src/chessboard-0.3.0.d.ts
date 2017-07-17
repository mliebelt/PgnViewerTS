// See the description found under http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
// how to write a class declaration file for an existing library.
export = ChessBoard;

declare class ChessBoard {
    constructor(boardID: string, configuration: Object);

    position(fen: string): number;
}