import CryptoJS from "crypto-js";
export default {
  /* 加密 */
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('OXp507kQFQYhRH5YnbFeBEzykI6ztb1h') // qwertyuiop0987654321这个自己随便写，相当于密钥吧，也可以自己单独用个变量存
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
  },
  /* 解密 */
  decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('OXp507kQFQYhRH5YnbFeBEzykI6ztb1h') // 要和加密的密钥一样
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },
}