import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authenSlice from './authenSlice';
import thunk from 'redux-thunk';
import accountSlice from './accountSlice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  account: accountSlice.reducer
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
