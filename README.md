# Iterable

[![Build Status](https://travis-ci.org/bvalosek/iterable.png?branch=master)](https://travis-ci.org/bvalosek/iterable)
[![NPM version](https://badge.fury.io/js/iterable.png)](http://badge.fury.io/js/iterable)

A library that provides lazily-evaluated `Sequence`-based iterable objects with
deferred querying and aggregation.

> This project is still pre-1.0 and not yet considered stable.

[![browser support](https://ci.testling.com/bvalosek/iterable.png)](https://ci.testling.com/bvalosek/iterable)

## Installation

Works on the server or the browser (via [Browserify](http://browserify.org)):

```
npm install iterable
```

## Usage

With CommonJS modules in Node or Browserify:

```javascript
var Sequence = require('iterable').Sequence;
```

With AMD / RequireJS:

```
TBD
```

Via script tags and polluting the global scope:

```
TBD
```

### Creating a Sequence

### Using Sequence as a Mixin 

## Sequence Member Functions

#### any
#### average
#### concat
#### contains
#### count
#### distinct
#### elementAt
#### every
#### except
#### first
#### forEach
#### groupBy
#### intersect
#### join
#### last
#### max
#### min
#### orderBy
#### orderByDescending
#### reduce
#### reverse
#### select
#### selectMany
#### skip
#### skipWhile
#### sum
#### take
#### takeWhile
#### toArray
#### toString
#### union
#### where

## Tern Support

The source files are all decorated with [JSDoc3](http://usejsdoc.org/)-style
annotations that work great with the [Tern](http://ternjs.net/) code inference
system. Combined with the Node plugin (see this project's `.tern-project`
file), you can have intelligent autocomplete for methods in this library.

![tern screenshot](/doc/tern.png)

## Testing

Testing is done with [Tape](http://github.com/substack/tape) and can be run
with the command `npm test`.

Automated CI cross-browser testing is provided by
[Testling](http://ci.testling.com/bvalosek/iterable), and server-side testing
is done with [Travis CI](https://travis-ci.org/bvalosek/iterable).

## License
Copyright 2014 Brandon Valosek

**Iterable** is released under the MIT license.
