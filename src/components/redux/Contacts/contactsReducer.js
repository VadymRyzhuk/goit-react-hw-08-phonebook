import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContacts, addNewContact, deleteContact } from 'services/api';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await getContacts();
      //  console.log(contacts);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddNewContact = createAsyncThunk(
  'contacts/apiAddNewContact',
  async (newContact, thunkApi) => {
    try {
      const contact = await addNewContact(newContact);
      // console.log(contact);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (contactId, thunkApi) => {
    try {
      const contact = await deleteContact(contactId);
      // console.log(contact);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: {
    items: null ?? [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.items = [...state.contacts.items, action.payload];
      //state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(apiGetContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.contacts.error = action.error.message;
      })
      //  -----------------------------------------------------------apiAddNewContact
      .addCase(apiAddNewContact.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(apiAddNewContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      .addCase(apiAddNewContact.rejected, (state, action) => {
        state.contacts.error = action.error.message;
      })
      //  -----------------------------------------------------------apiAddNewContact
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.contacts.error = action.error.message;
      }),
});

// Генератори екшенів
export const { addContact, removeContact, setFilter } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
