import { AxiosResponse } from 'axios';
import HttpClient from '../../services/HttpClient';
import { host } from '../types/client';
import IBooks, { Ticker } from '../types/IBooks';
import IOrderBook from '../types/IOrderBook';
import ITickers from '../types/ITickers';

export class PublicAPI extends HttpClient {
  constructor({ version, test }: { version: string; test?: boolean }) {
    super(test ? host.TEST : host.PROD + '/' + version);
    this._initializeResponseInterceptor();
  }

  public async getAvailableBooks(): Promise<IBooks[]> {
    return await this._httpClient.get<[IBooks]>('/available_books');
  }

  public async getTicker(book: Ticker): Promise<ITickers> {
    return await this._httpClient.get<ITickers>('/ticker?book=' + book);
  }

  public async getOrderBook(book: Ticker): Promise<IOrderBook[]> {
    return await this._httpClient.get<[IOrderBook]>('/order_book?book=' + book);
  }

  private _initializeResponseInterceptor(): void {
    this._httpClient.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _handleResponse = ({ data }: AxiosResponse) => data.payload;

  protected _handleError = (error: any) => Promise.reject(error);
}
