# Overview

This project tries to rebuild PgnViewerJS in Typescript. I try to get rid of some of the stuff I don't like any more, by using a better language, a better structure at the beginning, ...

* Follow the tutorials in [Typescript Handbook](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html): Seems reasonable, and could be followed easily.
* Use the overview of [Typescript Programming](https://code.visualstudio.com/docs/languages/typescript) of the builders of this editor.

![Build status on travis-ci.org](https://travis-ci.org/mliebelt/PgnViewerTS.svg?branch=master)

## Library structure

* Try to use Typescript as much as possible.
* Define `*.d.ts` files for libraries defined in Javascript.
* Try to find those files when they exist on the internet (use typings for that).
* Follow existing conventions as much as possible.

## Class structure

The building blocks for the application are:

* `chess.js`: Defines class `Chess`,  that wraps all chess functionality: legal moves, castling, pawn promotion, ...
* `chessboard-0.3.0.js`: Defines the class `ChessBoard`, that creates a board in HTML. See `examples/empty-board.html` for a native usage.
* `pgn-parser.js`: Provides the one function `parse` which is mapped by `pgn.ts` to `pgnParser(string)`. This can be tested stand-alone without any other stuff (and should be).
* `Game.ts`: Defines class PgnGame, that stands for just one PGN game (at the moment). Not sure how it will move in the future:
  * PGN as collection of PgnGame
  * Collection of PGN managed by PgnUI
* `Move.ts`: PgnMove class to wrap the moves parsed by the parser in an "object" format. This allows to add some functions like `isChess`, `isMate`, .... and others.
* `Reader.ts`: PgnReader that (only) reads a PGN game and converts it to a PgnGame object. Writing is done by another object.
* `pgnv.ts`: Defines the following class: `PgnUI` (or any other name) that will implement the necessary UI things. This class may be tested only by UI tests (done with Karma).

This will lead to the following object structure:

* 1 PGN file ==>
  0..n PGN objects
    moves[]: PgnMove
      previousMove: PgnMove
      nextMove: PgnMove
      variations: PgnMove[] // First move of the variation

:smile:

## Testing

There are 2 kinds of tests necessary:

* model tests / unit tests: Those will be done by Jasmine (without UI), and can be started by `grunt jasmine`.
* UI Tests / integration tests: Those will be done by Karma and PhantomJS, combined with Jasmine. I hope this will allow to test  the base functionality, with a rich set of tests that will find any regression later.
  * See [Setup Karma ...](http://orizens.com/wp/topics/my-setup-for-testing-js-with-jasmine-karma-phantomjs-angularjs/) for an experience report.
  * See [grunt-karma](https://github.com/karma-runner/grunt-karma) how to integrate it with Grunt.
  * See [Jasmine Cheatsheet](http://ricostacruz.com/cheatsheets/jasmine.html) for all available options here.

Perhaps we will need a different structure for that:

* Jasmine: `spec/model` and run with `grunt jasmine`.
* Karma: `spec/ui` and run with `grunt karma`.
