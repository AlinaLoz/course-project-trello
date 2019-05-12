import {ACTIONS} from "../constans";

export const setValue = (component, field, value) => dispatch => {
  dispatch({
    type: ACTIONS.LINK.SET_VALUE,
    component,
    field,
    value
  });
};