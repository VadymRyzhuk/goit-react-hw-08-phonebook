import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './Contacts/contactsReducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
