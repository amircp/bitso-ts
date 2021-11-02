import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { host } from '../types/client';
import { Ticker } from '../types/IBooks';
import IPlaceOrder, { IOrderID } from '../types/IPlaceOrder';
import { IOpenOrders, IOrderTrades, IUserTrades } from '../types/Trades';

export class TradeAPI extends HttpClient {
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

  async getOpenOrders(book: Ticker): Promise<[IOpenOrders]> {
    const endpoint = 'open_orders';
    this.setRequest({
      method: 'GET',
      payload: {},
      endpoint: endpoint,
    });
    return await this._httpClient.get<[IOpenOrders]>(endpoint + '?book=' + book);
  }

  async cancelOrder(oids: string[]): Promise<[string]> {
    const endpoint = 'orders';
    let queryParams = '?oids='.concat(oids.join(','));
    this.setRequest({
      method: 'DELETE',
      payload: {},
      endpoint: endpoint,
    });
    return await this._httpClient.get<[string]>(endpoint + queryParams);
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

  async placeMarketBuyOrder(currency: Ticker): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'buy',
      type: 'market'      
    };
    return await this.placeOrder(request);
  }

  async placeMarketSellOrder(currency: Ticker): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'market'      
    };
    return await this.placeOrder(request);
  }

  async placeLimitSellOrder({currency, limit_price} : {currency: Ticker, limit_price: number}): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'limit',
      price: limit_price.toString()      
    };
    return await this.placeOrder(request);
  }

  async placeLimitBuyOrder({currency, limit_price} : {currency: Ticker, limit_price: number}): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'limit',
      price: limit_price.toString()      
    };
    return await this.placeOrder(request);
  }

  async getUserTrades(): Promise<[IOrderTrades]> {
    const endpoint = 'user_trades';
    this.setRequest({
      method: 'POST',
      payload: '',
      endpoint: endpoint,
    });
    return await this._httpClient.post<[IOrderTrades]>(endpoint);
  }

  async getOrderTrades(origin_ids: string[]): Promise<[IOrderTrades]> {
    const endpoint = 'order_trades';
    let queryParams = origin_ids.length > 0 ? '?origin_id='.concat(origin_ids.join(',')) : '';
    this.setRequest({
      method: 'GET',
      payload: {},
      endpoint: endpoint,
    });
    return await this._httpClient.get<[IOrderTrades]>(endpoint + queryParams);
  }

  async lookupOrders(oids:string[]): Promise<[IOpenOrders]> {
    const endpoint = 'order';
    let queryParams = oids.length > 0 ? '?oids='.concat(oids.join(',')) : '';
    this.setRequest({
      method: 'GET',
      payload: {},
      endpoint: endpoint,
    });
    return await this._httpClient.get<[IOpenOrders]>(endpoint + queryParams);
  }

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
