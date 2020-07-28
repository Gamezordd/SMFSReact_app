import { createStore, combineReducers } from "redux";
import { User } from "./reducers/User";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User,
    })
  );
  return store;
};
