
/* IMPORT */

import Base256 from 'base256-encoding';
import {Packed, UnpackedValue, Unpacked, UnpackOptions} from './types';
import {NOOP, TYPE_ARRAY, TYPE_OBJECT} from './constants';

/* MAIN */

const Unpacker = {

  /* HELPERS */

  _getDivider: ( packed: Packed ): string | undefined => {

    if ( packed === TYPE_ARRAY || packed === TYPE_OBJECT ) return;

    const match = /\n-+\n/.exec ( packed );
    const divider = match?.[0];

    if ( !divider ) throw new Error ( 'Malformed archive, divider not found' );

    return divider;

  },

  _getObject: ( packed: Packed, divider: string | undefined, decode: boolean = true ): Unpacked => {

    const decoder = decode ? ( value: UnpackedValue ) => Base256.decodeStr ( value ) : NOOP;
    const sections = divider ? packed.split ( divider ) : [packed];
    const type = sections[0];
    const values = sections.slice ( 1 );

    if ( type === TYPE_ARRAY ) {

      return values.map ( decoder );

    } else {

      const object = {};

      for ( let i = 0, l = values.length; i < l; i += 2 ) {

        const key = Base256.decodeStr ( values[i] );
        const value = decoder ( values[i + 1] );

        object[key] = value;

      }

      return object;

    }

  },

  /* API */

  unpack: ( packed: Packed, options?: UnpackOptions ): Unpacked => {

    const divider = Unpacker._getDivider ( packed );
    const object = Unpacker._getObject ( packed, divider, options?.decode );

    return object;

  }

};

/* EXPORT */

export default Unpacker;
