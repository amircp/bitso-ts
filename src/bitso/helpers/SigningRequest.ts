import * as crypto from 'crypto';

export default class SigningRequest {
  private _nonce: number;
  private _version: string;
  private _method: string;
  private _payload: any;
  private _key: string;
  private _secret: string;
  private _endpoint: string;
  private _bufferSigning: string;

  constructor({
    endpoint,
    version,
    method,
    payload,
    key,
    secret,
  }: {
    endpoint: string;
    version: string;
    method: string;
    payload: object;
    key: string;
    secret: string;
  }) {
    this._nonce =  new Date().getTime();
    this._version = version ?? 'v3';
    this._method = method || '';
    this._payload = payload ?? {};
    this._key = key;
    this._secret = secret;
    this._endpoint = endpoint ?? '';
    this._bufferSigning = '';
  }

  private isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  serializePayload(): string {
    return JSON.stringify(this._payload);
  }

  createSigningRequest(): string {
    this._nonce = new Date().getTime();
    this._bufferSigning = `${this._nonce}${this._method}/${this._version}/${this._endpoint}`;
    if (!this.isEmpty(this._payload)) {
      const serializedPayload = this.serializePayload();
      this._bufferSigning = this._bufferSigning.concat(serializedPayload);
    }
    return crypto
      .createHmac('sha256', this._secret)
      .update(this._bufferSigning)
      .digest('hex');
  }

  set payload(payload: any) {
    this._payload = payload;
  }

  set endpoint(endpoint: string) {
    this._endpoint = endpoint;
  }

  set method(method: string) {
    this._method = method;
  }

   getHeader(): string {
    const signingRequest = this.createSigningRequest();
    return `Bitso ${this._key}:${this._nonce}:${signingRequest}`;
  }
}
