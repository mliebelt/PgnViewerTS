# TODOs

## Examples

* Find in [Best chess games of all times](http://www.chessgames.com/perl/chesscollection?cid=1001601) some examples. Heavily annotated, but variations in the comments (only). Have to been reworked to be playable.
* [Annotated old games](http://www.chessgames.com/perl/chesscollection?cid=1013362) like the previous ones.
* [Nice annotated current games](https://gameknot.com/best-annotated-games.pl) but mostly also with variations in comments.
* [Chessgames.com annotated](http://www.chessgames.com/perl/ezsearch.pl?search=annotated) archive, have to check that as well.
* Save some of them under `examples/pgn` and try to make them richer.

## Structure

Current structure is the following:

* `src/*.ts|*.d.ts`: Typescript source files or source declaration files
* `src/pgn-rules.peg`: Grammar for pgn --> will be compiled to `lib/js/pgn-parser.js`
* `spec/*.js`: Jasmine scipts to test the application (has to be refactored to differentiate non-browser and browwser tests)
* `spec/helpers|support`: Unknown what Jasmine does here, so leave untouched until I need it.
* `node_modules`: As usual, not in CM, managed by npm.
* `lib`: Base directory for the targets:
  * `lib/css`: Manually managed CSS and other files
  * `lib/js`: Generated Javascript files (from Typescript of the PEG grammar)
* `dist`: minified versions of the whole application. This should (later) be the base for all examples. So the HTML files to show the functionality should be minimal from the boilerplate code needed.
* `.gitignore`: Don't have to explain that.
* `package.json`: The usual file, will be  filled later. Defines all dependencies and the tasks that are used during development.

## Steps to implement

* Started with the PEG parser (existing), and built the specs to test it all.
* Then algorithm to generate real moves (with new defined PgnMove), so that there is a real API connected to it.
  This algorithm is now complete (including variations), but has to be tested more thoroughly.
* Then the validation of the moves. Currently, only the syntax is checked, and a lot of flags (like STRIKE, CHECK, DISCRIMINATOR) is not checked at all, but just taken from the moves. The information about the move number is kept, but should be recomputed.

## Algorithm for Validation

* Iterate over the moves. :white_check_mark:
* For each move, get the start FEN first. This should be held in each move. :white_check_mark:
* For the start move, the FEN is set from the startPosition of the PGN instance. :white_check_mark:
* Try to make the move from that position, make the move through Chess. :white_check_mark:
* In error, try variations: disambiguation (too much), start and stop position, ... :x:

### Validation in chess.js

The following things are not allowed at the moment in chess.js

* Wrong disambiguation:
  * Q8d5 with only one queen (or only one queen is able to move to d5) ==> Qd5
  * N8c6 ==> Nc6 needed
* Left out column character for pawn moves
  * exd5 needed, xd5 is not allowed (even if only one pawn can capture on d5)
* Get in touch with `chess.js` and enter there tickets, so that those facts are known. At least the last one hurts, because you have to "invent" disambiguation even if it is not needed. :x:

## Development and Build

### :white_check_mark: Build with NPM

There are some articles about using NPM directly for the build without Grunt. So I should have a look and see if that is a replacement. This would allow to remove a lot of plugins installed only for Grunt, that build a small wrapper around the real call to Node.js.

* [https://scotch.io/tutorials/using-npm-as-a-build-tool](https://scotch.io/tutorials/using-npm-as-a-build-tool)
* [https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
* [https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0](https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0)

Done it for part of the build process, and man, it does not hurt! It was pretty easy to get rid of some of the dependencies, so I will use in the future `package.json` only for that purpose.

### Unit Testing :white_check_mark:

I am using Jasmine for unit tests, but would like to write those tests in Typescript (only)

* Found [Installable typings files](https://angular.io/docs/ts/latest/guide/typescript-configuration.html) that had the following line: `npm install @types/jasmine --save-dev`
* Use `package.json` to define the task "jasmine", and use `jasmine.json` to define the default parameters and structure.
* Run jasmine then in the command shell by calling `npm test` for all tests or `npm test lib/js/tests/GameSpec.js` to run only the GameSpec tests.

### :x: UI Testing

I would like to use Jasmine (because I know it pretty well), and Karma and PhantomJS to do UI tests.
This is what I have installed (directly):

* `karma`: The UI test framework (unclear, what it does)
* `karma-jasmine`: Integrate Jasmine into Karmo (or the other way round?)
* `karma-phatomjs-launcher`: Allows to run UI tests in the non-UI browser PhantomJS
* `grunt-karma`: to use Grunt for the tasks

### :white_check_mark: Integrate Emojis into Markdown

* Tried to install markdown-it, markdown-it-emoji and grunt-markdown-it, but the resulting files (`docs/README.html` and `docs/todo.html`) don't contain the emojis.
* Have to find a way to teach VS Code to use markdown-it-emoji when doing a preview.

References:

* [markdown-it-emoji plugin](https://github.com/markdown-it/markdown-it-emoji) to integrate emojis into markdown.
* [VS Code markdown documentation](https://code.visualstudio.com/docs/languages/markdown) that explains how to handle Markdown in the build process.
* [Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/) to find emojis (when they are working in the end)
* [Stackoverflow Question](https://stackoverflow.com/questions/43020963/how-to-integrate-markdown-it-emoji-into-vs-code) about my problem with the integration.
* [VS Code Extension to Markdown and Emoji](https://github.com/mjbvz/vscode-markdown-emoji) Great extension that did the job at the end. Not official released, but works at the moment.

## Rough Design

The rough design (in textual mode) is the following:

### Classes

* PgnGame: one game extracted from a PGN string.
* PgnList: is that necessary? Perhaps just an array of PgnGame is sufficient.
* PgnReader: Reads a string of one or more PgnGame(s) and returns just that.
* PgnWriter: Takes one or more PgnGame(s) and writes our the games as specified. See the [specification](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm) for details.
* PgnMove: chess moves in the PgnGame.
* Chess: Registered as (typed) class, from the external library.
* ChessBoard: Registered as well, also from the external library

### Relations

* PgnGame
  * PgnMove: 0..n, including backreference (check, if that is needed)
  * What else?
* PgnReader:
  * Chess: 1, used for checking moves, does the validation, goes further than the parser alone.
* PgnWriter: nothing else needed, just implement the necessary algorithm.