const integerToChar =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
let charToInteger: { [char: string]: number } = {};

for (let i = 0; i < integerToChar.length; i++) {
  charToInteger[integerToChar[i]] = i;
}

export function encode(input: number | number[]): string {
  if (typeof input === 'number') {
    return encodeInteger(input);
  }
  let result = '';
  for (const v of input) {
    result += encodeInteger(v);
  }
  return result;
}

function encodeInteger(input: number): string {
  let result = '';
  const sign = input < 0 ? ((input = -input), 1) : 0;
  const bits = (input & 15) << 1;
  let continuation = (input >>= 4) === 0 ? 0 : 32;
  result += integerToChar[bits | continuation | sign];
  while (continuation) {
    const bits = input & 31;
    continuation = (input >>= 5) === 0 ? 0 : 32;
    result += integerToChar[bits | continuation];
  }
  return result;
}

export function decode(input: string): number[] {
  let result = [];
  let number = 0;
  let continuation = 0;
  let sign = 0;
  let shift = 0;

  for (const char of input) {
    let integer = charToInteger[char];

    if (integer === undefined) {
      throw new Error('Invalid character (' + char + ')');
    }

    continuation = integer & 32;
    integer &= 31;
    if (shift === 0) {
      sign = integer & 1;
      integer >>= 1;
    }

    number |= integer << shift;

    if (!continuation) {
      result.push(sign ? -number : number);
      number = 0;
      continuation = 0;
      sign = 0;
      shift = 0;
      continue;
    }

    if (shift === 0) {
      shift = 4;
    } else {
      shift += 5;
    }
  }
  return result;
}
