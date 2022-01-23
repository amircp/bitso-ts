import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { host } from '../types/client';
import { FundingDestination } from '../types/Funding';


export class FundsAPI extends HttpClient {
  private _signReq: SigningRequest;
  private apiVersion: string = ''
  constructor(
    { version, test }: { version: string; test?: boolean },
    signRequest: SigningRequest
  ) {
    super(test ? host.TEST : host.PROD);
    this.apiVersion = version;
    this._signReq = signRequest;
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  async fundingDestination(fund_currency: string): Promise<FundingDestination> {
    const endpoint = 'funding_destination';
    
    this._signReq.method = 'GET';
    this._signReq.payload = {};
    this._signReq.endpoint = endpoint;

      return await this._httpClient.get<FundingDestination>('/' + this.apiVersion + '/' + endpoint + '?fund_currency=' + fund_currency);
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
    config.headers['Content-Type'] = 'application/json';
    return config;
  };

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
