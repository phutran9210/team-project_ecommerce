export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_type: string;
  price: string;
  onSale: number;
  sale_start: string | null;
  sale_end: string | null;
  disable_status: boolean;
  engraving: boolean;
  quantity: number;
  primary_img: string;
  details: ProductDetail[];
  images: ImageProduct[];
  coverImages: CoverImage[];
  categories: Category[];
}

export interface ProductDetail {
  detail_id: string;
  product_id: string;
  parent_categories?: string | null;
  product_type?: string | null;
  product_description?: string | null;
  price?: string | null;
  quantity?: number | null;
  sale?: number | null;
  product_status?: string | null;
  image_description?: string | null;
  model?: string | null;
  dimensions?: string | null;
  drivers?: string | null;
  weight?: string | null;
  engraving?: boolean | null;
  impedance?: string | null;
  battery_life?: string | null;
  analog_headphone?: string | null;
  product_connection?: string | null;
  wired_digital_headphone?: string | null;
  cables?: string | null;
  ear_coupling?: string | null;
  talk_microphones?: string | null;
  anc_microphones?: string | null;
  atena?: string | null;
  ear_pads?: string | null;
  bluetooth_profile?: string | null;
  voice_assistant?: string | null;
  sale_time?: string | null;
  active_noise_cancelling?: string | null;
  ambient_listening_modes?: string | null;
  audio_format?: string | null;
  charging_case_battery_life?: string | null;
  charging_case_time_cable?: string | null;
  charging_case_time_wireless?: string | null;
  connectivity_between?: string | null;
  connectivity_distance?: string | null;
  earphone_battery_life?: string | null;
  earphone_charge_time?: string | null;
  material?: string | null;
  microphone_type?: string | null;
  sport_earphones?: string | null;
  waterproof_level?: string | null;
  max_output?: string | null;
  input?: string | null;
  in_the_box?: string | null;
  compatibility?: string | null;
  power_supply?: string | null;
}

export interface ImageProduct {
  image_id: string;
  image_url: string;
}

export interface CoverImage {
  cover_image_id: string;
  image_url: string;
}

export interface Category {
  category_id: string;
  category_name: string;
  category_description?: string | null;
}
