import { useMemo } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/contacts/phonebook-actions';
import useLocalStorage from './hooks/useLocalStorage.js';
import Section from 'components/Section/Section';
import Search from 'components/Search/Search';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';

const App = ({ contacts, filter, setContacts, setFilter }) => {
  const formSubmitHandler = data => {
    let isUniqueName = contacts.find(elem => elem.name.includes(data.name));

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      setContacts([...contacts, { ...userId, ...data }]);
    } else {
      const myAlert = alert({
        title: 'Alert',
        text: `${isUniqueName.name} is already in contacts`,
      });
    }
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const filterContact = useMemo(() => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  }, [contacts, filter]);

  return (
    <>
      <Section title={'Phonebook'}>
        <Search onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChange} />
        <Contacts contacts={filterContact} deleteContact={deleteContact} />
      </Section>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state.contacts);
  return {
    contacts: state.contacts.items,
    filter: state.contacts.filter,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setContacts: value => dispatch(actions.addContacts(value)),
    setFilter: value => dispatch(actions.addFilter(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
