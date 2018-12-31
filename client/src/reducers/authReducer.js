import { TEST_DISPATCH } from "../actions/types";

const initialState = {
  isAuthinticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TEST_DISPATCH:
      return {
        ...initialState,
        user: action.payload
      };
    default:
      return state;
  }
}
