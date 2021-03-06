
/* IMPORT */

import {describe} from 'fava';
import Archive from '../dist/index.js';

/* MAIN */

describe ( 'Base256 Archive', it => {

  it ( 'can serialize and deserialize flat arrays containing numbers or strings', t => {

    const fixtures = [
      [],
      [0],
      [123],
      [123, 456, 789],
      [''],
      ['foo'],
      ['foo', 'bar'],
      [123, 'foo', 'bar', 456]
    ];

    for ( const fixture of fixtures ) {

      t.deepEqual ( Archive.unpack ( Archive.pack ( fixture ) ), fixture.map ( String ) );

    }

  });

  it ( 'can serialize and deserialize flat objects containing numbers or strings', t => {

    const fixtures = [
      {},
      { 123: '' },
      { '': 123 },
      { foo: '123' },
      { foo: '123', bar: '456', baz: '789' }
    ];

    for ( const fixture of fixtures ) {

      t.deepEqual ( Archive.unpack ( Archive.pack ( fixture ) ), Object.fromEntries ( Object.entries ( fixture ).map ( ([ key, value ]) => [key, String ( value )] ) ) );

    }

  });

});
