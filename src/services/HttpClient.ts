import axios, { AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly _httpClient: AxiosInstance;

  constructor(
    private baseUrl: string,
    private headers?: any,
    private timeout?: number
  ) {
    this._httpClient = this.getInstance();
  }

  private openConnection(): AxiosInstance {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout ?? 5000,
      headers: this.headers ?? {},
    });
  }

  public setAuthToken(token: string): void {
    this._httpClient.defaults.headers.common['Authorization'] =
      'Bearer ' + token;
  }

  public setHeaders(customHeaders: object): void {
    Object.assign(this._httpClient.defaults.headers, customHeaders);
  }

  public setAPIBase(url: string): void {
    this._httpClient.defaults['baseURL'] = url;
  }

  public getInstance(): AxiosInstance {
    return this._httpClient ? this._httpClient : this.openConnection();
  }
}
