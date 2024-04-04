
/* IMPORT */

import Packer from './packer';
import Unpacker from './unpacker';
import type {Packed, Packable, PackOptions, Unpacked, UnpackOptions} from './types';

/* MAIN */

const Archive = {

  /* API */

  pack: ( packable: Packable, options?: PackOptions ): Packed => {

    return Packer.pack ( packable, options );

  },

  unpack: ( packed: Packed, options?: UnpackOptions ): Unpacked => {

    return Unpacker.unpack ( packed, options );

  }

};

/* EXPORT */

export default Archive;
export type {Packed, Packable, PackOptions, Unpacked, UnpackOptions};
