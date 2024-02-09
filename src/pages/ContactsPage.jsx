import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';

const ContactsPage = () => {
  return (
    <div>
      <h1 style={{ marginLeft: 30 }}>Phonebook</h1>
      <ContactForm />
      <h2 style={{ marginLeft: 30 }}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
