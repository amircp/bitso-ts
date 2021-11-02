import { Ticker } from "./IBooks"
export type fee_data = {
    book: Ticker,
    taker_fee_decimal: string,
    taker_fee_percent: string,
    taker_fee_decimal: string,
    taker_fee_percent: string
}
export type Fees = {
    fees: [fee_data]
}