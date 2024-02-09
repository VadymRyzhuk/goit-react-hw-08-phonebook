import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = store => store.contacts.contacts.items;
export const selectFilter = store => store.contacts.filter;
export const selectContactsIsLoading = store =>
  store.contacts.contacts.isLoading;
export const selectContactsError = store => store.contacts.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
