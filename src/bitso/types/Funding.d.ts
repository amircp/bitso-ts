export type DetailCrypto = {
    tx_hash: string
}

export type DetailFiat = {
    sender_name : string,
    sender_bank: string,
    sender_clabe: string,
    receive_clabe: string,
    numeric_reference: string,
    concepto: string,
    clave_rastreo: string,
    beneficiary_name: string
}

export type Funding = {
    fid: string,
    status: string,
    created_at: string,
    currency: string,
    method: string,
    amount: string,
    details: DetailCrypto | DetailFiat
}

export type FundingDestination = {
    account_identifier_name: string,
    account_identifier: string
}