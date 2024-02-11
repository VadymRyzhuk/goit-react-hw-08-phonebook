import React from 'react';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { apiAddNewContact } from './redux/Contacts/contactsReducer';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts.items);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [newContact, setNewContact] = useState(null);
  const handleChange = event => {
    const nameValue = event.target.value.trim();
    setName(nameValue);
  };

  const handleNumber = event => {
    const numberValue = event.target.value;
    setNumber(numberValue);
  };

  useEffect(() => {
    if (newContact) {
      dispatch(apiAddNewContact(newContact))
        .unwrap()
        .then(data => {
          toast.success(`${data.name} was successfully added!`);
        });
    }
  }, [dispatch, newContact]);

  const onAddClick = event => {
    event.preventDefault();

    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicateName) {
      alert(
        'This name is already in the phonebook. Please choose a different name.'
      );
      return;
    }

    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    };

    setNewContact(contactToAdd);

    event.currentTarget.reset();
  };

  return (
    <div style={{ margin: 30 }}>
      <form onSubmit={onAddClick} className={css.formData}>
        <label>
          <span className={css.labelTitleName}>Name:</span>
          <input
            className={css.inputForm}
            type="text"
            placeholder="Anna"
            name="name"
            onChange={handleChange}
            pattern="^[A-Za-z ]*$"
            required
          />
        </label>
        <label>
          <span className={css.labelTitleNumber}>Number:</span>
          <input
            className={css.inputForm}
            type="tel"
            placeholder="50102050"
            name="number"
            onChange={handleNumber}
            pattern="[0-9]*"
            required
          />
        </label>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export { ContactForm };
