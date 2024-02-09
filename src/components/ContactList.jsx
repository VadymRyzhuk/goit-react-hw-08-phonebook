import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from './redux/Contacts/contactsReducer';
import {
  apiGetContacts,
  apiDeleteContact,
} from './redux/Contacts/contactsReducer';
import css from './ContactList.module.css';
import { Circles } from 'react-loader-spinner';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(store => store.contacts.contacts.items);
  const filter = useSelector(store => store.contacts.filter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );

  //-----------------------------------------------------------------------------------add to local storage
  // useEffect(() => {
  //   const stringifiedContacts = JSON.stringify(contacts);
  //   localStorage.setItem('contacts', stringifiedContacts);
  // }, [contacts]);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);
  //-----------------------------------------------------------------------------------add to local storage
  const isLoading = useSelector(store => store.contacts.contacts.isLoading);
  const error = useSelector(store => store.contacts.contacts.error);

  //-----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      {error ? (
        `Ooppsss, some error occured!!!`
      ) : isLoading ? (
        <div className={css.loader}>
          <Circles
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} // 3 секунди
          />
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
