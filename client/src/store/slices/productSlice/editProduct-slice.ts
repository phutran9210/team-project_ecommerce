import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PayloadGetProduct {
  page: number;
}

export interface PayloadOneProduct {
  product_id: string;
}

type ProductDetails = {
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
  images: Image[];
  coverImages: CoverImage[];
  categories: Category[];
};

type ProductDetail = {
  detail_id: string;
  product_id: string;
  parent_categories: string | null;
  product_type: string | null;
  battery_life?: string;
  analog_headphone?: string;
  product_connection?: string;
  wired_digital_headphone?: string;
  power_supply?: string | null;
  earphone_battery_life?: string | null;
  earphone_charge_time?: string | null;
  material?: string;
  microphone_type?: string | null;
  sport_earphones?: string | null;
  waterproof_level?: string | null;
  max_output?: string | null;
  input?: string | null;
  in_the_box?: string | null;
  compatibility?: string | null;
};

type Image = {
  image_id: string;
  image_url: string;
};

type CoverImage = {
  cover_image_id: string;
  image_url: string;
};

type Category = {
  category_id: string;
  category_name: string;
  category_description: string | null;
};

export interface EditId {
  product_id: string;
}

const initialState = {
  loading: false,
  data: {} as ProductDetails,
  dataProduct: {} as ProductDetails,
  totalPages: 0,
  error: null,
  editProductId: {} as EditId,
};
const editProduct = createSlice({
  name: "edit_product",
  initialState,
  reducers: {
    getProductRequest: (state, action: PayloadAction<PayloadGetProduct>) => {
      state.loading = true;
    },
    getProductSuccsess: (state, action) => {
      (state.loading = false), (state.data = action.payload);
    },
    getProductFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    //lấy product id
    sendProductIdRequest: (state, action: PayloadAction<EditId>) => {
      state.loading = true;
    },
    sendProductIdSuccess: (state, action) => {
      state.loading = false;
      state.editProductId = action.payload;
    },

    //lấy data product để edit
    getProductEditRequest: (
      state,
      action: PayloadAction<PayloadOneProduct>
    ) => {
      state.loading = true;
    },
    getProductEditSuccsess: (state, action) => {
      (state.loading = false), (state.dataProduct = action.payload);
    },
    getProductEditFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    // edit Product
    sentEditProductRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    sentEditProductSuccsess: (state, action) => {
      console.log(action.payload);

      (state.loading = false), (state.dataProduct = action.payload);
    },
    sentEditProductFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  getProductFailure,
  getProductRequest,
  getProductSuccsess,
  sendProductIdRequest,
  sendProductIdSuccess,
  getProductEditRequest,
  getProductEditSuccsess,
  getProductEditFailure,
  sentEditProductRequest,
  sentEditProductSuccsess,
  sentEditProductFailure,
} = editProduct.actions;
export default editProduct.reducer;
