(() => {
  const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift));
  const add = (...values) => values.reduce((sum, value) => (sum + value) >>> 0, 0);
  const md5 = (input) => {
    const source = new TextEncoder().encode(input);
    const size = Math.ceil((source.length + 9) / 64) * 64;
    const bytes = new Uint8Array(size);
    bytes.set(source);
    bytes[source.length] = 0x80;
    const view = new DataView(bytes.buffer);
    const bitLength = source.length * 8;
    view.setUint32(size - 8, bitLength >>> 0, true);
    view.setUint32(size - 4, Math.floor(bitLength / 0x100000000), true);
    const shifts = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
    const constants = Array.from({ length: 64 }, (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 0x100000000) >>> 0);
    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;
    for (let offset = 0; offset < size; offset += 64) {
      const words = Array.from({ length: 16 }, (_, index) => view.getUint32(offset + index * 4, true));
      let a = a0;
      let b = b0;
      let c = c0;
      let d = d0;
      for (let index = 0; index < 64; index++) {
        let f;
        let wordIndex;
        let shift;
        if (index < 16) {
          f = (b & c) | (~b & d);
          wordIndex = index;
          shift = shifts[index % 4];
        } else if (index < 32) {
          f = (d & b) | (~d & c);
          wordIndex = (5 * index + 1) % 16;
          shift = shifts[4 + index % 4];
        } else if (index < 48) {
          f = b ^ c ^ d;
          wordIndex = (3 * index + 5) % 16;
          shift = shifts[8 + index % 4];
        } else {
          f = c ^ (b | ~d);
          wordIndex = (7 * index) % 16;
          shift = shifts[12 + index % 4];
        }
        const rotated = rotateLeft(add(a, f, constants[index], words[wordIndex]), shift) >>> 0;
        [a, d, c, b] = [d, c, b, add(b, rotated)];
      }
      a0 = add(a0, a);
      b0 = add(b0, b);
      c0 = add(c0, c);
      d0 = add(d0, d);
    }
    return [a0, b0, c0, d0].map((word) =>
      [0, 8, 16, 24].map((shift) => ((word >>> shift) & 0xff).toString(16).padStart(2, '0')).join('')
    ).join('');
  };

  const passwordHash = 'e38b9beb83ec2f275ad02d4afbb75c24';
  window.verifyBirthdayPassword = (password) => md5(`${password}ldj`) === passwordHash;
})();
