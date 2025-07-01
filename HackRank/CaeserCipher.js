function caesarCipher(s, k) {
    // Write your code here
    const size = 26;
    const a_ASCII = 'a'.charCodeAt(0);
    const z_ASCII = 'z'.charCodeAt(0);
    const A_ASCII = 'A'.charCodeAt(0);
    const Z_ASCII = 'Z'.charCodeAt(0);
    k = k % size;

    const arr = s.split('').map(v => v.charCodeAt(0)).map((code) => {
        if (code >= A_ASCII && code <= Z_ASCII) {
            let nextCode = code + k;
            if (nextCode > Z_ASCII) {
                nextCode = A_ASCII + nextCode - Z_ASCII - 1;
            }
            return String.fromCharCode(nextCode);
        }else if (code >= a_ASCII && code <= z_ASCII) {
            let nextCode = code + k;
            if (nextCode > z_ASCII) {
                nextCode = a_ASCII + nextCode - z_ASCII - 1;
            }
            return String.fromCharCode(nextCode);
        }else return String.fromCharCode(code);
    });
    return arr.join('')
}

console.log(caesarCipher('Always-Look-on-the-Bright-Side-of-Life', 5));