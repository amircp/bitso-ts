export type txInfo = {
  withdrawal_address: string;
  tx_hash: string | null;
}

export type speiInfo = {
  sender_name: string;
  receive_clabe: string;
  sender_clabe: string;
  numeric_reference: sring;
  concepto: string;
  clave_rastreo: string | null;
  beneficiary_name: string;
}

export type TWithDrawal = {
  wid: string;
  status: string;
  created_at: string;
  currency: string;
  method: string;
  amount: string;
  details: txInfo;
  status?: string;
}

export type TBankCode = {
  code: string;
  name: string;
}

