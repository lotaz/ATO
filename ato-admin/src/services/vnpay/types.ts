export interface VNPayConfig {
  tmnCode: string;
  hashSecret: string;
  url: string;
  command: string;
  currCode: string;
  version: string;
  locale: string;
  paymentBackReturnUrl: string;
}

export interface UpdateVNPayConfigRequest extends VNPayConfig {}