//import { useEffect } from 'react';
//import { removeContact } from './redux/Contacts/contactsReducer';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from './Loader';
import {
  // selectContacts,
  //selectFilter,
  selectContactsIsLoading,
  selectContactsError,
  selectFilteredContacts,
} from './redux/Contacts/contactsReducer.selectors';
import css from './ContactList.module.css';
import {
  apiGetContacts,
  apiDeleteContact,
  removeContact,
} from './redux/Contacts/contactsReducer';

const ContactList = () => {
  const dispatch = useDispatch();

  //const contacts = useSelector(selectContacts);
  //const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  // );

  //-----------------------------------------------------------------------------------add to local storage
  // useEffect(() => {
  //   const stringifiedContacts = JSON.stringify(contacts);
  //   localStorage.setItem('contacts', stringifiedContacts);
  // }, [contacts]);
  //-----------------------------------------------------------------------------------add to local storage
  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  //-----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      {error ? (
        `Ooppsss, some error occured!!!`
      ) : isLoading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : (
        <ul>
          {filteredContacts.map(contact => (
            <li className={css.list} key={contact.id} id={contact.id}>
              <span>{contact.name}:</span> <span>{contact.phone}</span>
              <button
                onClick={() => {
                  dispatch(removeContact(contact.id));
                  dispatch(apiDeleteContact(contact.id));
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { ContactList };
