import { combineReducers } from 'redux';
const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'contacts/addItem':
      return action.payload;
    default:
      return state;
  }
};
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'contacts/addFilter':
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  items: itemReducer,
  filter: filterReducer,
});
