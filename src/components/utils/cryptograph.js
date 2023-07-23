import * as crypto from 'crypto-js';

export default class Cryptograph {
  constructor() {
    this.cKey = 'G_qccVFZM5eyFHLCB9AMFopnO6o7kBkf';
  }

  encrypt({ value }) {
    const key = crypto.enc.Utf8.parse(this.cKey);
    const iv = crypto.enc.Base64.parse(this.cKey).toString().substring(0, 16);
    const encrypted = crypto.AES.encrypt(value, key, {
      iv: crypto.enc.Utf8.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  decrypt({ value }) {
    const key = crypto.enc.Utf8.parse(this.cKey);
    const iv = crypto.enc.Base64.parse(this.cKey).toString().substring(0, 16);
    const decrypted = crypto.AES.decrypt(value, key, {
      iv: crypto.enc.Utf8.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypted.toString(crypto.enc.Utf8);
  }
}
