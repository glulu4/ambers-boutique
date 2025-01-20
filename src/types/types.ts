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