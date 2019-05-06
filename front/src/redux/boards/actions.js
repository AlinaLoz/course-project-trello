import {ACTIONS} from "../constans";
import {Xhr} from "../../services/Xhr";

export const getBoards = () => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.GET_ALL.RQ});
    const data = await Xhr.getBoards();
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.SC,
      data
    })
  } catch (err) {
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.FL,
      data: err.message
    });
  }
};

export const createBoard = (name, isTeamBoard, team) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.CREATE.RQ});
    const data = await Xhr.createBoard(name, isTeamBoard, team);
    dispatch({
      type: ACTIONS.BOARD.CREATE.SC,
      data
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
    const data = await Xhr.dropBoard(id);
    dispatch({
      type:ACTIONS.BOARD.DROP.SC,
      data: data
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

export const getBoardById =  (id) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.GET_ALL.RQ});
    const data = await Xhr.getBoardById(id);
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.SC,
      data
    })
  } catch (err) {
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.FL,
      data: err.message
    });
  }
};

export const createList =  (idBoard, nameList) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.CREATE_LIST.RQ});
    const data = await Xhr.createList(idBoard, nameList);
    dispatch({
      type: ACTIONS.BOARD.CREATE_LIST.SC,
      idBoard,
      data
    })
  } catch (err) {
    dispatch({
      type: ACTIONS.BOARD.CREATE_LIST.FL,
      data: err.messages
    });
  }
};

export const dropList =  (id) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.DROP_LIST.RQ});
    const data = await Xhr.deleteList(id);
    dispatch({
      type: ACTIONS.BOARD.DROP_LIST.SC,
      data
    })
  } catch (err) {
    dispatch({
      type: ACTIONS.BOARD.DROP_LIST.FL,
      data: err.message
    });
  }
};

