import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from './redux/Contacts/contactsReducer';
const Filter = () => {
  const dispatch = useDispatch();
  const handleFilter = event => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <div style={{ margin: 30 }}>
      <p>
        Find contact by name:
        <input
          onChange={handleFilter}
          type="text"
          name="keyword"
          placeholder="Anna"
          pattern="^[A-Za-z]*$"
        />
      </p>
    </div>
  );
};

export { Filter };
