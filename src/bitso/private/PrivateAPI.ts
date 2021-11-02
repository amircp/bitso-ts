import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { host } from '../types/client';
import { Ticker } from '../types/IBooks';
import IPlaceOrder, { IOrderID } from '../types/IPlaceOrder';

export class PrivateAPI extends HttpClient {
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

  async getAccountBalance(): Promise<any> {
    const endpoint = 'balance';
    this.setRequest({
      method: 'GET',
      payload: {},
      endpoint: endpoint,
    });

    return await this._httpClient.get<any>(endpoint);
  }

  async getOpenOrders(book: Ticker): Promise<any> {
    const endpoint = 'open_orders';
    this.setRequest({
      method: 'GET',
      payload: {},
      endpoint: endpoint,
    });

    return await this._httpClient.get<any>(endpoint + '?book=' + book);
  }

  async cancelOrder(oids: string[]): Promise<any> {
    const endpoint = 'orders';
    let queryParams = '?oids='.concat(oids.join(','));
    this.setRequest({
      method: 'DELETE',
      payload: {},
      endpoint: endpoint,
    });

    return await this._httpClient.get<any>(endpoint + queryParams);
  }

  async placeOrder(orderPayload: IPlaceOrder): Promise<IOrderID> {
    const endpoint = 'orders';
    this.setRequest({
      method: 'POST',
      payload: orderPayload,
      endpoint: endpoint,
    });
    return await this._httpClient.post<IOrderID>(endpoint);
  }

  //async getFees() {}

  private setRequest({
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
