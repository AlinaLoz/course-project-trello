import {ACTIONS} from "../constans";
import {Xhr} from "../../services/Xhr";

export const getBoards = (query) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.GET_ALL.RQ});
    const data = await Xhr.getBoards();
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.SC,
      data: data.data.getBoards
    })
  } catch (e) {
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.FL,
      data: e.message
    });
  }
};

export const createBoard = () => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.CREATE.RQ});
    const data = await Xhr.createBoard();
    dispatch({
      type:ACTIONS.BOARD.CREATE.SC,
      data: data.data.createBoard
    })
  }catch(e) {
    return dispatch({
      type: ACTIONS.BOARD.CREATE.FL,
      data: e.message
    });
  }
};

export const dropBoard = (id) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.DROP.RQ});
    const data = await Xhr.dropBoard({id});
    dispatch({
      type:ACTIONS.BOARD.DROP.SC,
      data: data.data.dropBoard
    })
  }catch(e) {
    return dispatch({
      type: ACTIONS.BOARD.CREATE.FL,
      data: e.message
    });
  }
};

export const dropMessage = () => dispatch => {
  dispatch({type: ACTIONS.BOARD.MESSAGE,});
};