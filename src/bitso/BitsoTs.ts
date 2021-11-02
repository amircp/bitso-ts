import SigningRequest from './helpers/SigningRequest';
import { PrivateAPI } from './private/PrivateAPI';
import { PublicAPI } from './public/PublicAPI';
import { Ticker } from './types/IBooks';

const BitsoTs = ({
  version,
  key,
  secret,
  test,
}: {
  version: string;
  key: string;
  secret: string;
  test: boolean;
}): any => {
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

export default BitsoTs;
