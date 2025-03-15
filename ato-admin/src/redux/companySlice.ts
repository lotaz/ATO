import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { companyService } from '../services/company/companyService';
import { Company, CreateCompanyRequest, UpdateCompanyRequest } from '../services/company/types';
import { User } from '../types';

export const getCompanies = createAsyncThunk('company/getAll', async () => await companyService.getCompanies());
export const getCompany = createAsyncThunk('company/getOne', async (id: string) => await companyService.getCompany(id));
export const createCompany = createAsyncThunk(
  'company/create',
  async (data: CreateCompanyRequest) => await companyService.createCompany(data)
);
export const updateCompany = createAsyncThunk(
  'company/update',
  async (data: UpdateCompanyRequest) => await companyService.updateCompany(data)
);
export const getUnAssigedAccounts = createAsyncThunk('company/account', async () => await companyService.getUnAssigedAccounts());

interface CompanyState {
  data: Company[];
  specific: Company | null;
  loading: boolean;
  error: string | null;
  unassigned: User[] | null;
}

const companySlice = createSlice({
  name: 'company',
  initialState: {
    data: [],
    specific: null,
    loading: false,
    error: null,
    unassigned: []
  } as CompanyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnAssigedAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnAssigedAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.unassigned = action.payload;
      })
      .addCase(getUnAssigedAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi khi tải danh sách tài khoản';
        enqueueSnackbar('Lỗi khi tải danh sách tài khoản', { variant: 'error' });
      })
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi khi tải danh sách công ty';
        enqueueSnackbar('Lỗi khi tải danh sách công ty', { variant: 'error' });
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.specific = action.payload;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.data.push(action.payload);
        enqueueSnackbar('Tạo công ty thành công', { variant: 'success' });
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi tạo công ty';
        enqueueSnackbar(state.error, { variant: 'error' });
      })

      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.data.findIndex((c) => c.tourCompanyId === action.payload.tourCompanyId);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        enqueueSnackbar('Cập nhật công ty thành công', { variant: 'success' });
      })

      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi cập nhật thông tin công ty';
        enqueueSnackbar(state.error, { variant: 'error' });
      });
  }
});

export default companySlice;
