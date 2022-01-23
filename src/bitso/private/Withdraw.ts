import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { host } from '../types/client';

export class WithdrawAPI extends HttpClient {
  private _signReq: SigningRequest;

  constructor(
    { version, test }: { version: string; test?: boolean },
    signRequest: SigningRequest
  ) {
    super(test ? host.TEST : host.PROD + '/' + version + '/');
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
    this._signReq = signRequest;
  }

  /* private setRequest({
    method,
    payload,
    endpoint,
  }: {
    method: string;
    payload: any;
    endpoint: string;
  }): void {
    this._signReq.method(method);
    this._signReq.payload(payload);
    this._signReq.endpoint(endpoint);
  }*/
  private _initializeResponseInterceptor(): void {
    this._httpClient.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  private _initializeRequestInterceptor = () => {
    this._httpClient.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = this._signReq.getHeader();
    config.headers['Content-Type'] = 'application/json';
    return config;
  };

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
