
/* TYPES */

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

/* EXPORT */

export {Packed, PackableValue, Packable, PackOptions, UnpackedValue, Unpacked, UnpackOptions};
