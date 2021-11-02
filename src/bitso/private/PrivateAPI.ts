import SigningRequest from "../helpers/SigningRequest";
import { AccountAPI } from "./Account";
import { FundsAPI } from "./Funds";
import { TradeAPI } from "./Trade";

const PrivateAPI = (version: string, test: boolean, Sign: SigningRequest): object => {
  return {
    ... new TradeAPI({version, test}, Sign),
    ... new AccountAPI({version, test}, Sign),
    ... new FundsAPI({version, test}, Sign)
  }
}

export default PrivateAPI;