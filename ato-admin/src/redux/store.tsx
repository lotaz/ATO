import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import accountSlice from './accountSlice';
import authenSlice from './authenSlice';
import blogSlice from './blogSlice';
import companySlice from './companySlice';
import facilitySlice from './facilitySlice';
import vnpaySlice from './vnpaySlice';
import emailConfigSlice from './emailConfigSlice';
import productSlice from './tourism-facility/product.slice';
import certificateSlice from './tourism-facility/certificate.slice';
import packageSlice from './tourism-facility/package.slice';
import activitySlice from './tourism-facility/activity.slice';
import orderSlice from './tourism-facility/order.slice';
import contractSlice from './tourism-facility/contract.slice';
import tourPackageSlice from './tourism-company/tour-package.slice';
import tourDestinationSlice from './tourism-company/tour-destination.slice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  account: accountSlice.reducer,
  blog: blogSlice.reducer,
  company: companySlice.reducer,
  facility: facilitySlice.reducer,
  vnpay: vnpaySlice.reducer,
  emailConfig: emailConfigSlice.reducer,
  productSlice: productSlice.reducer,
  certificateSlice: certificateSlice.reducer,
  packageSlice: packageSlice.reducer,
  activitySlice: activitySlice.reducer,
  orderSlice: orderSlice.reducer,
  contractSlice: contractSlice.reducer,
  tourPackageSlice: tourPackageSlice.reducer,
  tourDestinationSlice: tourDestinationSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
