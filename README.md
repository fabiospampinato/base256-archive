# Base256 Archive

Simple archive format that produces a [base256](https://github.com/fabiospampinato/base256-encoding)-encoded string.

As a rule of thumb you should probably just use JSON, but if your use cases involves storing a big object in memory and/or reading only a fraction of it on average this alternative archive format may save you a good amount of memory and CPU time.

## Features

- **Simple**: It's a simple archive format that can serialize an array or a plain object containing numbers or strings into a [base256](https://github.com/fabiospampinato/base256-encoding)-encoded string, and deserialize that back.
- **Tiny**: It's ~2kb min+gzip, with only one dependency that I personally maintain.
- **Isomorphic**: It works both in Node and in the browser.
- **Memory-efficient**: Compared to JSON this may require 50%+ less memory, since the produced string will always weigh 1 byte per character in memory, compared to up to 2 bytes per character in memory with JSON, and the number of characters produced by both formats is basically the same.
- **CPU-efficient**: Compared to JSON this can be much more efficient at extracting data from the serialized string, as you can unpack it super quickly without decoding the values and then decode/parse only the values you need, only when needed and if needed at all.

## Details

- Only flat arrays and flat plain objects containing only numbers or strings can be serialized, if you need more complex structures you should JSON-stringify those first.
- Numbers are converted automatically into strings during serialization, you should JSON.stringify your values before encoding them and JSON.parse them after decoding if you want to preserve numbers or complex structures.
- If the data to serialize contains control characters then compared to JSON this will save you even more memory, since in JSON a single control character can balloon into multiple characters once serialized, like `\x10`, which can take up to 2 bytes per characters in the end so up to 8 bytes in total in this case, while with this archive format control characters only take 1 byte, like any other outputted character, that's 8x less memory.
- If the data to serialize comprises of many tiny numbers or strings this may not be the most suitable format for you, as there is a tiny memory overhead to pay that scales with the number of elements to serialize, if those elements are tiny too though (like 10 characters instead of 1000s) then that'll add up.

## Install

```sh
npm install --save base256-archive
```

## Usage

The following interface is provided:

```ts
type Packed = string;

type PackableValue = number | string;

type PackableArray = PackableValue[];

type PackableObject = Record<PackableValue, PackableValue>;

type Packable = PackableArray | PackableObject;

type PackOptions = {
  encode?: boolean
};

type UnpackedValue = string;

type UnpackedArray = UnpackedValue[];

type UnpackedObject = Record<UnpackedValue, UnpackedValue>;

type Unpacked = UnpackedArray | UnpackedObject;

type UnpackOptions = {
  decode?: boolean
};

type Archive = {
  pack ( packable: Packable, options?: PackOptions ): Packed,
  unpack ( packed: Packed, options?: UnpackOptions ): Unpacked
};
```

You'd use the library like this:

```ts
import Archive from 'base256-archive';
import Base256 from 'base256-encoding';

// Packing & unpacking a flat array

{
  const arr = [1, 'foo', '😃'];
  const packed = Archive.pack ( arr );
  console.log ( packed ); // => '1\n---\n1\n---\nfoo\n---\nð\x9F\x98\x83'

  const unpacked = Archive.unpack ( arr );
  console.log ( unpacked ); // => [ '1', 'foo', '😃' ]
}

// Packing & unpacking a flat plain object

{
  const obj = { foo: 123, bar: '😃' };
  const packed = Archive.pack ( obj );
  console.log ( packed ); // => '2\n---\nfoo\n---\n123\n---\nbar\n---\nð\x9F\x98\x83'

  const unpacked = Archive.unpack ( obj );
  console.log ( unpacked ); // => { foo: '123', bar: '😃' }
}

// Packing & unpacking a flat plain object without automatically decoding values

{
  const obj = { foo: 123, bar: '😃' };
  const packed = Archive.pack ( obj );
  const unpacked = Archive.unpack ( obj, { decode: false } );
  console.log ( unpacked ); // => { foo: '123', bar: 'ð\x9F\x98\x83' }
  // Then at a later time manually parse individual values when needed
  // This is useful if values need decompressing, JSON-parse-ing, or whatever other expensive manipulation
  // Decoding from base256 is super fast, but doing so may cause the decoded strings to require double the amount of memory
  const bar = Base256.decodeStr ( unpacked.bar );
  console.log ( bar ); // => '😃'
}
```

## License

MIT © Fabio Spampinato
