export const selectedCategorySelector = (state: {
  createProduct: { parent_categories: string };
}) => state.createProduct.parent_categories;

export const formdataSelector = (state: {
  createProduct: { dataForm: object };
}) => state.createProduct.dataForm;

export const formDetailDataSelector = (state: {
  createProduct: { dataFormDetail: object };
}) => state.createProduct.dataFormDetail;

export const resetFormAddProductSelector = (state: {
  createProduct: { resetAllForm: boolean };
}) => state.createProduct.resetAllForm;

/**
 * ! admin  selector
 */

export const dataProductsByPage = (state: { editProduct: { data: object } }) =>
  state.editProduct.data;

export const productIdToHomeSelector = (state: {
  editProduct: { editProductId: string };
}) => state.editProduct.editProductId;

export const productEditSelector = (state: {
  editProduct: { dataProduct: object };
}) => state.editProduct.dataProduct;
