# Iterable

A library that provides lazily-evaluated `Sequence`-based iterable objects with
deferred querying and aggregation.

> This project is still pre-1.0 and not yet considered stable.

## Installation

Works on the server or the browser (via [Browserify](http://browserify.org)):

```
npm install iterable
```

## Usage

Typically you'll want to interact with the `Sequence` class:

```javascript
var Sequence = require('iterable').Sequence;

var mySequence = Sequence.from([1,2,3,4]).where( ... );
```

### Creating a Sequence

### Distilling a Sequence

## Lazily Evaluation and Deferred Execution

## The `Iterable` Interface

### `Iterator`

## `Sequence` Member Functions

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

## License
Copyright 2014 Brandon Valosek

**Iterable** is released under the MIT license.
