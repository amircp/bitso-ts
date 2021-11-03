export type Account = {
    client_id: string;
    first_name: string;
    last_name: string;
    status: string;
    daily_liimt: string;
    monthly_limit: string;
    daily_remaining: string;
    monthly_remaining: string,
    cash_deposit_allowance: string;
    cellphone_number: string;
    cellphone_number_stored: string;
    email_stored: string;
    official_id: string;
    proof_of_residency: string;
    signed_contract:string;
    origin_of_funds:string;
}

export type AccountBalance = {
    current: string;
    total: string;
    locked: string;
    available: string;
}

export type Balance = {
    balances: [AccountBalance];
}
