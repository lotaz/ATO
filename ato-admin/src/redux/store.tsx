import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authenSlice from './authenSlice';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducers = combineReducers({
  authen: authenSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export { persistor, store };
