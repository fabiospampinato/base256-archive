
/* IMPORT */

import Base256 from 'base256-encoding';
import {IDENTITY, TYPE_ARRAY, TYPE_OBJECT} from './constants';
import type {Packed, UnpackedValue, Unpacked, UnpackOptions} from './types';

/* HELPERS */

const Helpers = {

  /* API */

  getDivider: ( packed: Packed ): string | undefined => {

    if ( packed === TYPE_ARRAY || packed === TYPE_OBJECT ) return;

    const match = /\n-+\n/.exec ( packed );
    const divider = match?.[0];

    if ( !divider ) throw new Error ( 'Malformed archive, divider not found' );

    return divider;

  },

  getObject: ( packed: Packed, divider: string | undefined, decode: boolean = true ): Unpacked => {

    const decoder = decode ? ( value: UnpackedValue ) => Base256.decodeStr ( value ) : IDENTITY;
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

  }

};

/* MAIN */

const Unpacker = {

  /* API */

  unpack: ( packed: Packed, options?: UnpackOptions ): Unpacked => {

    const divider = Helpers.getDivider ( packed );
    const object = Helpers.getObject ( packed, divider, options?.decode );

    return object;

  }

};

/* EXPORT */

export default Unpacker;
