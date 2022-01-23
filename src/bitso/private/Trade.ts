import { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import SigningRequest from '../helpers/SigningRequest';
import { host } from '../types/client';
import { Ticker } from '../types/IBooks';
import IPlaceOrder, { IOrderID } from '../types/IPlaceOrder';
import { IOpenOrders, IOrderTrades } from '../types/Trades';

export class TradeAPI extends HttpClient {
  private _signReq: SigningRequest;

  constructor(
    { version, test }: { version: string; test?: boolean },
    signRequest: SigningRequest
  ) {
    super(test ? host.TEST : host.PROD + '/' + version + '/');
    this._signReq = signRequest;
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
  }

  public async getOpenOrders({
    book,
    marker,
    sort,
    limit
  }: {
    book?: Ticker,
    marker?: string,
    sort?: 'desc' | 'asc',
    limit?: string
  }): Promise<[IOpenOrders]> {
    const endpoint = 'open_orders';
    let queryParams = new URLSearchParams();
    if(book) queryParams.set('book', book);
    if(marker) queryParams.set('marker', marker);
    if(sort) queryParams.set('sort', sort);
    if(limit) queryParams.set('limit', limit);
    
    this._signReq.method = 'GET';
    this._signReq.payload = {};
    this._signReq.endpoint = endpoint + '?' + queryParams;
    
      return await this._httpClient.get<[IOpenOrders]>(endpoint + '?' + queryParams);
  }

  public async cancelOrder({
    oid, oids, origin_ids
  }:{
    oid?: string,
    oids?: string[],
    origin_ids?: string[]
  }): Promise<[string]> {
    const endpoint = 'orders';
    let endpointFinal = endpoint;
    if(oid)  {
      endpointFinal = endpointFinal.concat('/' + oid);
    } else if(oids) {
      let queryParams = new URLSearchParams();
      queryParams.set('oids', oids.join(','));
      endpointFinal = endpointFinal.concat('?' + queryParams);
    } else if(origin_ids) {
      let queryParams = new URLSearchParams();
      queryParams.set('origin_ids', origin_ids.join(','));
      endpointFinal = endpointFinal.concat('?' + queryParams);
    } else {
      endpointFinal = endpointFinal.concat('/all');
    }
    this._signReq.method = 'DELETE';
    this._signReq.payload = {};
    this._signReq.endpoint = endpointFinal;
  
    return await this._httpClient.delete<[string]>(endpointFinal);
  }

  public async placeOrder(orderPayload: IPlaceOrder): Promise<IOrderID> {
    const endpoint = 'orders';
    
    this._signReq.method = 'POST';
    this._signReq.payload = orderPayload;
    this._signReq.endpoint = endpoint;
    console.log(this._signReq.getHeader());
    return await this._httpClient.post<IOrderID>(endpoint, orderPayload);
  }

  public async placeMarketBuyOrder(currency: string, quantity: string): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'buy',
      type: 'market',
      minor: quantity
    };
    return await this.placeOrder(request);
  }

  public async placeMarketSellOrder(currency: string, quantity: string): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'market',
      major: quantity,
    };
    return await this.placeOrder(request);
  }

  public async placeLimitSellOrder({currency, limit_price, quantity} : {currency: Ticker, limit_price: string, quantity: string}): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'limit',
      price: limit_price,
      major: quantity,
    };
    return await this.placeOrder(request);
  }

  public async placeLimitBuyOrder({currency, limit_price, quantity} : {currency: Ticker, limit_price: string, quantity: string}): Promise<IOrderID> {
    const request: IPlaceOrder = {
      book: currency,
      side: 'sell',
      type: 'limit',
      price: limit_price,
      minor: quantity,   
    };
    return await this.placeOrder(request);
  }

  public async getUserTrades({
    oid,
    origin_id
  }:{
    oid?: string,
    origin_id?: string
  }): Promise<[IOrderTrades]> {
    let endpoint = 'user_trades';
    let queryParams = new URLSearchParams();
    if(oid) queryParams.set('oid', oid);
    if(origin_id) queryParams.set('origin_id', origin_id);
    let endpointFinal = endpoint + '/';
    if(queryParams) {
      endpointFinal = endpoint.concat('?' + queryParams);
    }

  
    this._signReq.method = 'GET';
    this._signReq.payload = {};
    this._signReq.endpoint = endpointFinal;
    return await this._httpClient.get<[IOrderTrades]>(endpointFinal);
  }

  public async getOrderTrades({origin_id, oid} : {origin_id?: string, oid?: string}): Promise<[IOrderTrades]> {
    let endpoint = 'order_trades';
    let queryParams = new URLSearchParams();
    if(oid) queryParams.set('oid', oid);
    if(origin_id) queryParams.set('origin_id', origin_id);
    let endpointFinal = endpoint + '/';
    if(queryParams) {
      endpointFinal = endpoint.concat('?' + queryParams);
    }


    this._signReq.method = 'GET';
    this._signReq.payload = {};
    this._signReq.endpoint = endpointFinal;

      return await this._httpClient.get<[IOrderTrades]>(endpointFinal);
  }

  public async lookupOrders({
    oid, oids, origin_ids
  }:{
    oid?: string,
    oids?: string[],
    origin_ids?: string[]
  }): Promise<[IOpenOrders]> {
    const endpoint = 'orders';
    let endpointFinal = endpoint;
    if(oid)  {
      endpointFinal = endpointFinal.concat('/' + oid);
    } else if(oids) {
      let queryParams = new URLSearchParams();
      queryParams.set('oids', oids.join(','));
      endpointFinal = endpointFinal.concat('?' + queryParams);
    } else if(origin_ids) {
      let queryParams = new URLSearchParams();
      queryParams.set('origin_ids', origin_ids.join(','));
      endpointFinal = endpointFinal.concat('?' + queryParams);
    } else {
      endpointFinal = endpoint
    }

  
    this._signReq.method = 'GET';
    this._signReq.payload = {};
    this._signReq.endpoint  = endpointFinal;
    
    return await this._httpClient.get<[IOpenOrders]>(endpointFinal);
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
    console.log(this._signReq.getHeader());
    return config;
  };

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
