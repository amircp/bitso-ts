import { AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import { host } from '../types/client';
import IBooks, { Ticker } from '../types/IBooks';
import IOrderBook from '../types/IOrderBook';
import ITickers from '../types/ITickers';
import { ITrades } from '../types/Trades';

export class PublicAPI extends HttpClient {

  private apiVersion: string = "";

  constructor({ version, test }: { version: string; test?: boolean }) {
    super(test ? host.TEST : host.PROD );
    this.apiVersion = version;
    this._initializeResponseInterceptor();
  }

  public async getAvailableBooks(): Promise<IBooks[]> {
    return await this._httpClient.get<[IBooks]>('/' + this.apiVersion + '/available_books');
  }

  public async getTicker(book: Ticker): Promise<ITickers> {
    return await this._httpClient.get<ITickers>('/' + this.apiVersion + '/ticker?book=' + book);
  }

  public async getOrderBook(book: Ticker): Promise<IOrderBook[]> {
    return await this._httpClient.get<[IOrderBook]>('/' + this.apiVersion + '/order_book?book=' + book);
  }

  public async getTrades({
    book,
    marker,
    sort,
    limit
  } : { book: Ticker, marker?: string, sort?: 'desc' | 'asc', limit?: string  }): Promise<[ITrades]> {
    let queryParams = new URLSearchParams();
    if(book) queryParams.set('book',book);
    if(marker) queryParams.set('marker', marker);
    if(sort)  queryParams.set('sort', sort);
    if(limit) queryParams.set('limit', limit) ;

    return await this._httpClient.get<[ITrades]>('/' + this.apiVersion + '/trades?'+queryParams);
  }

  private _initializeResponseInterceptor(): void {
    this._httpClient.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
