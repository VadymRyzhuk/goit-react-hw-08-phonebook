import axios from 'axios';
export async function getContacts() {
  const { data } = await axios.get(
    'https://65c22201f7e6ea59682ab1c4.mockapi.io/contacts/contacts'
  );
  return data;
}

export async function addNewContact(newContact) {
  const { data } = await axios.post(
    'https://65c22201f7e6ea59682ab1c4.mockapi.io/contacts/contacts',
    newContact
  );
  return data;
}

export async function deleteContact(contactId) {
  await axios.delete(
    `https://65c22201f7e6ea59682ab1c4.mockapi.io/contacts/contacts/${contactId}`
  );
}
