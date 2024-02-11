import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from './Loader';
import {
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
import { toast } from 'react-toastify';

const ContactList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

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
              <span>{contact.name}:</span> <span>{contact.number}</span>
              <button
                onClick={() => {
                  dispatch(removeContact(contact.id));
                  dispatch(apiDeleteContact(contact.id))
                    .unwrap()
                    .then(data => {
                      toast.success(`${data.name} was successfully deleted!`);
                    });
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
