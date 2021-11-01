export default interface IPlaceOrder {
  book: string;
  side: string;
  type: string;
  major: string;
  minor: string;
  price: string;
  stop: string;
  time_in_force: string;
  origin_id: string;
}

export interface IOrderID {
  oid: string;
}
