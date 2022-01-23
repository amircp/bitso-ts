import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { Account, AccountBalance } from '../types/Account';
import { host } from '../types/client';
import { Fees } from '../types/Fees';

export class AccountAPI extends HttpClient {
  private _signReq: SigningRequest;
  private apiVersion: string = "";
  constructor(
    { version, test }: { version: string; test?: boolean },
    signRequest: SigningRequest
  ) {
    super(test ? host.TEST : host.PROD);
    this.apiVersion = version;
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
    this._signReq = signRequest;
  }

  public async getAccountBalance(): Promise<[AccountBalance]> {
    const endpoint = 'balance';


    this._signReq.method = 'GET';
    this._signReq.payload  = {};
    this._signReq.endpoint = endpoint;

    return await this._httpClient.get<[AccountBalance]>('/' + this.apiVersion + '/' + endpoint);
  }

  public async getAccountStatus(): Promise<Account> {
    const endpoint = 'account_status';


    this._signReq.method = 'GET';
    this._signReq.payload  = {};
    this._signReq.endpoint = endpoint;


    return await this._httpClient.get<Account>('/' + this.apiVersion + '/' + endpoint);
  }

  public async getFees(): Promise<Fees> {
    const endpoint = 'fees';

    this._signReq.method = 'GET';
    this._signReq.payload  = {};
    this._signReq.endpoint = endpoint;

    return await this._httpClient.get<Fees>('/' + this.apiVersion + '/' + endpoint);
  }

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
    return config;
  };

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
