export interface StripeProductData {
  id: string;
  object: 'product';
  active: boolean;
  created: number;
  default_price: StripePrice | null;
  description: string | null;
  images: string[];
  marketing_features: string[];
  livemode: boolean;
  metadata: Record<string, any>;
  name: string;
  package_dimensions: null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  tax_code: string | null;
  unit_label: string | null;
  updated: number;
  url: string | null;
}

export interface StripeProductList {
  object: 'list';
  url: string;
  has_more: boolean;
  data: StripeProductData[];
}


export interface StripePrice {
  id: string;
  object: 'price';
  active: boolean;
  billing_scheme: 'per_unit';
  created: number;
  currency: string;
  custom_unit_amount: number | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, any>;
  nickname: string | null;
  product: string;
  recurring: null;
  tax_behavior: 'inclusive' | 'exclusive' | 'unspecified';
  tiers_mode: string | null;
  transform_quantity: null;
  type: 'one_time' | 'recurring';
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface StripeProductResponse {
  id: string;
  object: 'product';
  active: boolean;
  created: number;
  default_price: string | null;
  description: string | null;
  images: string[];
  marketing_features: string[];
  livemode: boolean;
  metadata: Record<string, any>;
  name: string;
  package_dimensions: unknown | null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  tax_code: string | null;
  unit_label: string | null;
  updated: number;
  url: string | null;
}

export interface LineItem {
  price:string;
  quantity:number;
}


export const shipping = {
  display:"$6.99",
  decimal:699,
}


interface HostedConfirmation {
  custom_message: string | null;
}

interface AfterCompletion {
  hosted_confirmation: HostedConfirmation;
  type: 'hosted_confirmation';
}

interface AutomaticTax {
  enabled: boolean;
  liability: string | null;
}

interface InvoiceData {
  account_tax_ids: string[] | null;
  custom_fields: any[] | null;
  description: string | null;
  footer: string | null;
  issuer: string | null;
  metadata: Record<string, any>;
  rendering_options: any | null;
}

interface InvoiceCreation {
  enabled: boolean;
  invoice_data: InvoiceData;
}

interface PhoneNumberCollection {
  enabled: boolean;
}

interface IssuerData {
  type: 'self';
}

interface InvoiceSettings {
  issuer: IssuerData;
}

interface SubscriptionData {
  description: string | null;
  invoice_settings: InvoiceSettings;
  trial_period_days: number | null;
}

interface TaxIdCollection {
  enabled: boolean;
}

interface CustomText {
  shipping_address: string | null;
  submit: string | null;
}

export interface StripePaymentLinkResponseObj {
  id: string;
  object: 'payment_link';
  active: boolean;
  after_completion: AfterCompletion;
  allow_promotion_codes: boolean;
  application_fee_amount: number | null;
  application_fee_percent: number | null;
  automatic_tax: AutomaticTax;
  billing_address_collection: 'auto' | 'required' | 'optional';
  consent_collection: any | null;
  currency: string;
  custom_fields: any[];
  custom_text: CustomText;
  customer_creation: 'if_required' | 'always' | 'never';
  invoice_creation: InvoiceCreation;
  livemode: boolean;
  metadata: Record<string, any>;
  on_behalf_of: string | null;
  payment_intent_data: any | null;
  payment_method_collection: 'always' | 'if_required';
  payment_method_types: string[] | null;
  phone_number_collection: PhoneNumberCollection;
  shipping_address_collection: {
    allowed_countries: string[];
  } | null;
  shipping_options: any[];
  submit_type: 'auto' | 'pay' | 'book' | 'donate';
  subscription_data: SubscriptionData;
  tax_id_collection: TaxIdCollection;
  transfer_data: any | null;
  url: string;
}