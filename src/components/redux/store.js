// import { configureStore } from '@reduxjs/toolkit';
// import { contactsReducer } from './Contacts/contactsReducer';
// import { authReducer } from './Auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     contacts: contactsReducer,
//     auth: authReducer,
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './Contacts/contactsReducer';
import { authReducer } from './Auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
  // blacklist: ['isLoading', 'error'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    contacts: contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
