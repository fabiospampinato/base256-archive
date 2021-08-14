
/* IMPORT */

import {Packed, Packable, PackOptions, Unpacked, UnpackOptions} from './types';
import Packer from './packer';
import Unpacker from './unpacker';

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
