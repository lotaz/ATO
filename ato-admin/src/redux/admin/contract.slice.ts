import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Contract, CreateContractRequest, UpdateContractRequest } from '../../types/admin/contract.types';
import { contractService } from '../../services/admin/contract.service';

interface ContractState {
  list: Contract[];
  specific: Contract | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContractState = {
  list: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchContracts = createAsyncThunk('contract/fetchContracts', async () => {
  const response = await contractService.getContracts();
  return response;
});

export const fetchContract = createAsyncThunk('contract/fetchContract', async (id: string) => {
  const response = await contractService.getContract(id);
  return response;
});

export const createContract = createAsyncThunk('contract/createContract', async (data: CreateContractRequest) => {
  const response = await contractService.createContract(data);
  return response;
});

export const updateContract = createAsyncThunk('contract/updateContract', async (data: UpdateContractRequest) => {
  const response = await contractService.updateContract(data);
  return response;
});

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contracts';
      })
      .addCase(fetchContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContract.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contract';
      })
      .addCase(createContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, action.payload];
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create contract';
      })
      .addCase(updateContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
        state.list = state.list.map((item) => (item.contractId === action.payload.contractId ? action.payload : item));
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update contract';
      });
  }
});

export default contractSlice;
