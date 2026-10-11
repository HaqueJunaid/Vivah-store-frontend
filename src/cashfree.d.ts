declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeInstance {
    checkout: (options: {
      paymentSessionId: string;
      redirectTarget?: '_self' | '_blank' | '_modal' | '_top';
    }) => Promise<any>;
  }

  export function load(options: {
    mode: 'sandbox' | 'production';
  }): Promise<CashfreeInstance>;
}
