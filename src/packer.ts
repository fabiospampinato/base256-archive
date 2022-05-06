
/* IMPORT */

import Base256 from 'base256-encoding';
import {TYPE_ARRAY, TYPE_OBJECT} from './constants';
import type {Packed, PackableValue, Packable, PackOptions} from './types';

/* HELPERS */

const Helpers = {

  /* API */

  getDivider: ( values: string[] ): string => {

    let length = 0;

    while ( true ) {

      length += 3;

      const divider = `\n${'-'.repeat ( length )}\n`;

      if ( values.find ( value => value.includes ( divider ) ) ) continue; // Not unique, skipping

      return divider;

    }

  },

  getValues: ( packable: Packable, encode: boolean = true ): string[] => {

    const encoder = encode ? ( value: PackableValue ) => Base256.encodeStr ( String ( value ) ) : String;

    if ( Array.isArray ( packable ) ) {

      return [TYPE_ARRAY, ...packable.map ( encoder )];

    } else {

      return [TYPE_OBJECT, ...Object.entries ( packable ).flat ().map ( encoder )];

    }

  }

};

/* MAIN */

const Packer = {

  /* API */

  pack: ( packable: Packable, options?: PackOptions ): Packed => {

    const values = Helpers.getValues ( packable, options?.encode );
    const divider = Helpers.getDivider ( values );
    const packed = values.join ( divider );

    return packed;

  }

};

/* EXPORT */

export default Packer;
