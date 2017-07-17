// See the description found under http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html
// how to write a class declaration file for an existing library.
export = Chess;

declare class Chess {
    constructor(fen: string)

    fen(): string;

    load(fen: string): boolean
}