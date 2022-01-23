import SigningRequest from "../helpers/SigningRequest";
import { AccountAPI } from "./Account";
import { FundsAPI } from "./Funds";
import { TradeAPI } from "./Trade";

const PrivateAPI = ({
  secret,
  key,
  version,
  test
} : {
  secret: string,
  key: string,
  version: string,
  test: boolean
}): {Trade: TradeAPI, Account: AccountAPI, Funds: FundsAPI}=> {
  const Sign = new SigningRequest({
    version: version,
    secret: secret,
    key: key,
    endpoint:'',
    method:'',
    payload: {}
  });
  return {
    Trade: new TradeAPI({version, test}, Sign),
    Account: new AccountAPI({version, test}, Sign),
    Funds: new FundsAPI({version, test}, Sign)
  }
}

export default PrivateAPI;