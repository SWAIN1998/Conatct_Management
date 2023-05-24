import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import contactReducer from "./reducers/contactReducer";

const store = createStore(contactReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;

export default store;
