import { Ticker } from "./IBooks"

export interface ITrades {
    book: Ticker,
    created_at: string,
    amount: string,
    marker_side: string,
    price: string,
    tid: string
}

export interface IUserTrades extends ITrades {
    major: string,
    minor: string,
    fees_amount: string,
    fees_currency: string,
    oid: string,
    side: string
}

export interface  IOrderTrades extends IUserTrades {
    origin_id: string,
    maker_side: string
}

export interface IOpenOrders extends IOrderTrades {
    original_amount: string,
    unfilled_amount: string,
    original_value: string,
    status: string,
    type: string
}