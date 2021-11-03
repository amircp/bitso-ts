export enum Ticker {
  BTCMXN = 'btc_mxn',
  ETHBTC = 'eth_btc',
  ETHMXN = 'eth_mxn',
  XRPBTC = 'xrp_btc',
  XRPMXN = 'xrp_mxn',
  LTCBTC = 'ltc_btc',
  LTCMXN = 'ltc_mxn',
  BCHBTC = 'bch_btc',
  BCHMXN = 'bch_mxn',
  TUSDBTC = 'tusd_btc',
  TUSDMXN = 'tusd_mxn',
  MANABTC = 'mana_btc',
  BATBTC = 'bat_btc',
  BATMXN = 'bat_mxn',
  BTCARS = 'btc_ars',
  BTCDAI = 'btc_dai',
  DAIMXN = 'dai_mxn',
  BTCUSD = 'btc_usd',
  XRPUSD = 'xrp_usd',
  ETHUSD = 'eth_usd',
  DAIARS = 'dai_ars',
  BTCBRL = 'btc_brl',
  ETHARS = 'eth_ars',
  ETHBRL = 'eth_brl',
  BTCUSDT = 'btc_usd',
  USDMXN = 'usd_mxn',
  USDARS = 'usd_ars',
  USDBRL = 'usd_brl',
  MANAUSD = 'mana_usd',
  LTCUSD = 'ltc_usd',
  COMPUSD = 'comp_usd',
  LINKUSD = 'link_usd',
  UNIUSD = 'uni_usd',
  AAVEUSD = 'aave_usd',
}

export default interface IBooks {
  book: string;
  minimum_amount: string;
  maximum_amount: string;
  minimum_price: string;
  maximum_price: string;
  minimum_value: string;
  maximum_value: string;
  tick_size: string;
  default_chart: string;
  fees: any;
}
