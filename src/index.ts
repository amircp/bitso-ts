import SigningRequest from './bitso/helpers/SigningRequest';
import { PrivateAPI } from './bitso/private/PrivateAPI';
import { PublicAPI } from './bitso/public/PublicAPI';
import { Ticker } from './bitso/types/IBooks';

function BitsoTS({version, key, secret, test}: {version: string, key: string, secret: string, test: boolean}): any {
  const SignRequest: SigningRequest = new SigningRequest({
    endpoint: '',
    version: version,
    method: '',
    payload: '',
    key: key,
    secret: secret,
  });
  return {
    ...Ticker,
    public: new PublicAPI({ version, test }),
    private: new PrivateAPI({ version, test }, SignRequest),
  };
};

export default BitsoTS;