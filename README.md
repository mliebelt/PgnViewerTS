# Overview

This project tries to rebuild PgnViewerJS in Typescript. I try to get rid of some of the stuff I don't like any more, by using a better language, a better structure at the beginning, ... :smile:

[![Build status on travis-ci.org](https://travis-ci.org/mliebelt/PgnViewerTS.svg?branch=master)](https://travis-ci.org/mliebelt/PgnViewerTS#L1)

## Overall plan

* Ensure that the base functionality of reading and writing PGN games is working again. Try to have unit tests for all aspects of the specification, and make that explicit.
* Have a stable, reliable build running all the time correct.
* Implement all functionality by Typescript classes.
* Only start working on the UI when the inner working is finished.

## Specification

* See [PGN Specification and Implementation Guide](http://www.saremba.de/chessgml/standards/pgn/pgn-complete.htm), especially the chapters
  * 3: Formats: Import and Export
  * 5: Commentary
  * 7: Tokens
  * 8: Parsing Games
  * 10: Numeric Annotation Glyphs (NAGs)
  * 16: Additional Chess Data Standards: FEN
* See [Algebraic Notation (Wikipedia)](https://en.wikipedia.org/wiki/Algebraic_notation_(chess)) which is easier to read. :smile:
* See [Numeric Annotation Glyphs (Wikipedia)](https://en.wikipedia.org/wiki/Numeric_Annotation_Glyphs) for additional information.