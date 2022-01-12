import actionTypes from './phonebook-types';
export const addContacts = value => ({
  type: actionTypes.ADD_ITEM,
  payload: value,
});

export const addFilter = value => ({
  type: actionTypes.ADD_FILTER,
  payload: value,
});
