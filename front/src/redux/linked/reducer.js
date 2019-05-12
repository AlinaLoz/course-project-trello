import {ACTIONS} from "../constans";

const initState = {
  history: {
    numberPage: 0,
  },
  listBoards: {
    numberPage: 0,
  },
  listTeams: {
    numberPage: 0,
  },
  listUsers: {
    numberPage: 0,
  }
};

export default function linked(state = initState, action) {
  switch (action.type) {
    case ACTIONS.LINK.SET_VALUE: {
      const { component, field, value } = action;
      const prevComponent = state[component];
      return {...state, [component]: {...prevComponent, [field]: value}}
    }
  }
  return  state;
}