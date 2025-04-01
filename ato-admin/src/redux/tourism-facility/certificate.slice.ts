import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Certificate } from '../../types/tourism-facility/certificate.types';
import { certificateService } from '../../services/tourism-facility/certificate.service';

interface CertificateState {
  certificates: Certificate[];
  specific: Certificate | null;
  loading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  specific: null,
  loading: false,
  error: null
};

export const fetchCertificates = createAsyncThunk('certificate/fetchByProduct', async (productId: string) => {
  const response = await certificateService.getByProduct(productId);
  return response;
});

export const fetchCertificate = createAsyncThunk('certificate/fetchOne', async (id: string) => {
  const response = await certificateService.getById(id);
  return response;
});

export const createCertificate = createAsyncThunk('certificate/create', async (data: any) => {
  const response = await certificateService.create(data);
  console.log('create', response);
  return response;
});

export const updateCertificate = createAsyncThunk('certificate/update', async ({ id, data }: { id: string; data: any }) => {
  const response = await certificateService.update(id, data);
  return response;
});

const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {
    resetSpecific: (state) => {
      state.specific = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch certificates
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch certificates';
      })
      // Fetch single certificate
      .addCase(fetchCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.specific = action.payload;
      })
      .addCase(fetchCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch certificate';
      })
      // Create certificate
      .addCase(createCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
      })
      .addCase(createCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create certificate';
      })
      // Update certificate
      .addCase(updateCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.certificates.findIndex((cert) => cert.certificationId === action.payload.certificationId);
        if (index !== -1) {
          state.certificates[index] = action.payload;
        }
        state.specific = action.payload;
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update certificate';
      });
  }
});

export const { resetSpecific } = certificateSlice.actions;
export default certificateSlice;
