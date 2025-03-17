import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/tourism-facility/order.types';
import { orderService } from '../../services/tourism-facility/order.service';

interface OrderState {
  list: Order[];
  specific: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  return await orderService.getAll();
});

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (id: number) => {
  return await orderService.getById(id);
});

export const updateOrderStatus = createAsyncThunk('order/updateStatus', async (data: { id: number; status: string }) => {
  return await orderService.updateStatus({ orderId: data.id, status: data.status as any });
});

export const updatePaymentStatus = createAsyncThunk('order/updatePaymentStatus', async (data: { id: number; paymentStatus: string }) => {
  return await orderService.updatePaymentStatus({ orderId: data.id, paymentStatus: data.paymentStatus as any });
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.specific = action.payload;
        state.list = state.list.map((order) => (order.orderId === action.payload.orderId ? action.payload : order));
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.specific = action.payload;
        state.list = state.list.map((order) => (order.orderId === action.payload.orderId ? action.payload : order));
      });
  }
});

export default orderSlice;
