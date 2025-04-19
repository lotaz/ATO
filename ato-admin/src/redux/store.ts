import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import accountSlice from './accountSlice';
import supportSlice from './admin/support.slice';
import authenSlice from './authenSlice';
import blogSlice from './blogSlice';
import companySlice from './companySlice';
import emailConfigSlice from './emailConfigSlice';
import facilitySlice from './facilitySlice';
import accommodationSlice from './tourism-company/accommodation.slice';
import driverSlice from './tourism-company/driver.slice';
import tourDestinationSlice from './tourism-company/tour-destination.slice';
import tourPackageSlice from './tourism-company/tour-package.slice';
import activitySlice from './tourism-facility/activity.slice';
import certificateSlice from './tourism-facility/certificate.slice';
import contractSlice from './tourism-facility/contract.slice';
import ocopSellSlice from './tourism-facility/ocop-sell.slice';
import packageSlice from './tourism-facility/package.slice';
import productSlice from './tourism-facility/product.slice';
import vnpaySlice from './vnpaySlice';

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
  contractSlice: contractSlice.reducer,
  tourPackageSlice: tourPackageSlice.reducer,
  tourDestinationSlice: tourDestinationSlice.reducer,
  driverSlice: driverSlice.reducer,
  accommodationSlice: accommodationSlice.reducer,
  ocopSellSlice: ocopSellSlice.reducer,
  supportSlice: supportSlice.reducer,
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
