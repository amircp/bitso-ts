interface IBookPrice {
  book: string;
  price: string;
  amount: string;
  oid?: string;
}

export default interface IOrderBook {
  asks: [IBookPrice];
  bids: [IBookPrice];
}
