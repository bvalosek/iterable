# Iterable

A library that provides lazily-evaluated `Sequence`-based iterable objects with
deferred querying and aggregation.

> This project is still pre-1.0 and not yettconsidered stable.


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

## The `Sequence` Member Functions

### any(`function(item:any): bool`): `Sequence`
### average(`function(item:any): number`): `number`
### concat(`Sequence`): `Sequence`
### contains(`any`): `bool`
### count(): `number`
### distinct(`function(item:any): any`)
### elementAt(`number`): `any`
### every(`function(item:any): bool`): `bool`
### except(`Sequence`): `Sequence`
### first(`function(item:any): bool`): `any`
### forEach(`function(item:any, index:number)`)
### groupBy(`function(item:any): string`, `function(item:any): any`): `Sequence`
### intersect(`Sequence`): `Sequence`
### join(`Sequence`, `function(item:any): string`, `function(item:any): string`): `Sequence`
### last(`function(item:any): bool`): `any`
### max(`function(item:any): number`): `number`
### min(`function(item:any): number`): `number`
### orderBy(`function(item:any): any`, `function(element:any): number`): `Sequence`
### orderByDescending(`function(item:any): any`, `function(element:any): number`): `Sequence`
### reduce(`function(acc:any, item:any): any`, `any`): `any`
### reverse(): `Sequence`
### select(`function(item:any, index:number): any`): `Sequence`
### selectMany(`function(item:any): Iterable`, `function(item:any, collection:Iterable):any`): `Sequence`
### skip(`number`): `Sequence`
### skipWhile(`function(item:any, index:number): bool`): `Sequence`
### sum(`function(item:any, index:number): any`): `number`
### take(`number`): `Sequence`
### takeWhile(`function(item:any, index:number): bool`): `Sequence`
### toArray(): `array`
### toString(): `string`
### union(`Sequence`): `Sequence`
### where(`function(item:any, index:number): bool`): `Sequence`

## Tern Support

The source files are all decorated with [JSDoc3](http://usejsdoc.org/)-style
annotations that work great with the [Tern](http://ternjs.net/) code inference
system. Combined with the Node plugin (see this project's `.tern-project`
file), you can have intelligent autocomplete for methods in this library.


## License
Copyright 2014 Brandon Valosek

**Iterable** is released under the MIT license.
