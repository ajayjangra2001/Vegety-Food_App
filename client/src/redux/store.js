import { legacy_createStore as createStore} from 'redux';
import userReducer from './userReducer';

// persist store code
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
    console.log(e);
  }
};

const persistedState = loadState();

// This persistedState is includedat the time of store creation as initial value
const store = createStore(userReducer, persistedState);

// This is actually call every time when store saved
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
