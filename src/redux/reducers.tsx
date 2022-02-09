import { combineReducers } from "redux";
import {
  CHANGE_LEARNING,
  CHANGE_TRANSLATE,
  TOGGLE_ON_INTEREST_SCREEN,
} from "./constants";

const INITIAL_SETTINGS = {
  learning: "NOT SET",
  translate: "NOT SET",
};

const INITIAL_NAV_STATE = {
  showHeader: true,
};

const settingsReducer = (state = INITIAL_SETTINGS, action: any) => {
  switch (action.type) {
    case CHANGE_LEARNING:
      return { learning: action.payload, translate: state.translate };
    case CHANGE_TRANSLATE:
      return { learning: state.learning, translate: action.payload };
    default:
      return state;
  }
};

const navReducer = (state = INITIAL_NAV_STATE, action: any) => {
  switch (action.type) {
    case TOGGLE_ON_INTEREST_SCREEN:
      return { showHeader: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  settings: settingsReducer,
  nav: navReducer,
});
