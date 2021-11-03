# Bitso-ts (Beta)

Simple TypeScript Bitso API Wrapper for Public and Private end points.
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/amircp/bitso-ts/blob/master/LICENSE) 
## Installation

To install Bitso-ts lib in your project:

```bash
yarn add bitso-ts
```
    
## How to use


### Public API


```javascript
import { PublicAPI, Ticker} from 'bitso-ts';

const Public = new PublicAPI({
  version:'v3',
  test: false
});

Public.getAvailableBooks().then( (data) => {
  console.log(data);
});
```
Ticker is a set of constants with cryptocurrencies available in the bitso exchange.

It is possible to specify the API version and to work with Test Sandbox API just changing the parameters to be passed (test and version).
#### Methods in Public API:
```javascript
getAvailableBooks(): Promise<IBooks[]>;
getTicker(book: Ticker): Promise<ITickers>;
getOrderBook(book: Ticker): Promise<IOrderBook[]>;
```

### Private API

To use the private api is needed to generate your api keys directly in your bitso account.

#### Initialize Private API Client
```javascript
import { PrivateAPI, Ticker} from 'bitso-ts';

const Bitso = PrivateAPI({
  version: 'v3',
  secret: 'b5d5e48474cbc5e6ef535def2f43e467',
  key: 'VxKti2rgXE',
  test: false
})
```

#### Getting your account balance
```javascript
Bitso.Account.getAccountBalance().then( (data) => {
  console.log(data);
});
```
The private API is splited into different name spaces:

* Funds
* Account
* Trade

Every namespace has its own set of functions. The most interesting one is Trade:
```javascript
    getOpenOrders(book: Ticker): Promise<[IOpenOrders]>;
    cancelOrder(oids: string[]): Promise<[string]>;
    placeOrder(orderPayload: IPlaceOrder): Promise<IOrderID>;
    placeMarketBuyOrder(currency: string, quantity: string): Promise<IOrderID>;
    placeMarketSellOrder(currency: string, quantity: string): Promise<IOrderID>;
    placeLimitSellOrder({ currency, limit_price, quantity }: {
        currency: Ticker;
        limit_price: string;
        quantity: string
    }): Promise<IOrderID>;
    placeLimitBuyOrder({ currency, limit_price, quantity}: {
        currency: Ticker;
        limit_price: number;
        quantity: string
    }): Promise<IOrderID>;
    getUserTrades(): Promise<[IOrderTrades]>;
    getOrderTrades(origin_ids: string[]): Promise<[IOrderTrades]>;
    lookupOrders(oids: string[]): Promise<[IOpenOrders]>;
```

### Example

In the following example will place a BUY LIMIT order into the exchange.
```javascript
Bitso.Trade.placeLimitBuyOrder(Ticker.BTCMXN,'1306864.89','1000').then( (data) => {
  console.log(data);
});
```

If you want to use your own way to place orders you can use the general purpose method "placeOrder"
please review bitso api documentation.
## TODO

* Currently working in the following Private API Implementation:
  - Withdrawals
* Document internal code.
* Implement unit testing with Jest

## Acknowledgements

 - [Bitso API  Documentation](https://bitso.com/api_info)
 - [@Loser_trader11](https://twitter.com/loser_trader11) (for the hamburger 🍔 )
 - [@RafaRJ_19](https://twitter.com/RafaRJ_19) 
 - [#TRMX - Traders Mexico Community](https://twitter.com/search?q=%23TRMX) 

## Authors

- [@Bursatilboy](https://www.twitter.com/bursatilboy) [![bursatilboy](https://img.shields.io/twitter/follow/bursatilboy?label=Follow)](https://twitter.com/bursatilboy)



## License

[MIT](https://choosealicense.com/licenses/mit/)

