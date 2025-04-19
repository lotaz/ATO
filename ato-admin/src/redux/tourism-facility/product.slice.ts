import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { productService } from '../../services/tourism-facility/product.service';
import type { Product, TCreateProduct } from '../../types/tourism-facility/product.types';

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  total: 0
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  console.log('ok');
  const response = await productService.getProducts();
  console.log('response', response);
  return response;
});

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id: string) => {
  const response = await productService.getProduct(id);
  return response.data;
});

export const createProduct = createAsyncThunk('product/createProduct', async (data: TCreateProduct) => {
  const response = await productService.createProduct(data);
  return response.data;
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, data }: { id: string; data: Partial<Product> }) => {
  const response = await productService.updateProduct(id, data);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message || 'Failed to fetch products';
        // enqueueSnackbar(state.error, { variant: 'error' });
      })
      // Fetch Single Product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
        enqueueSnackbar(state.error, { variant: 'error' });
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, _) => {
        state.loading = false;

        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' });
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product';

        enqueueSnackbar(state.error, { variant: 'error' });
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex((p) => p.productId === action.payload.productId);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
        enqueueSnackbar(state.error, { variant: 'error' });
      });
  }
});

export const { resetProduct } = productSlice.actions;
export default productSlice;
