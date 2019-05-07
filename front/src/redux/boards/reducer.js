import {ACTIONS} from "../constans";

const initState = {
    boards         : [],
    fetching       : false,
    message        : {}
};

export default function teams(state = initState, action) {
    switch (action.type) {
        case ACTIONS.BOARD.GET_ALL.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.GET_ALL.SC:{
          let { boards } = state;
          action.data.boards.forEach(b => {
              const changeObj = boards.find(b2 => b2.id == b.id);
              let indexObj = -1;
              if (changeObj) {
                  indexObj = boards.indexOf(changeObj);
                  boards[indexObj] = b;
              } else {
                  boards.push(b);
              }
          });
          return {...state, boards: [...boards], fetching: false, message: {negative: false}};
        }
        case ACTIONS.BOARD.GET_ALL.FL:
            return {...state, fetching: false, message: {info: action.data, negative: true}};

        case ACTIONS.BOARD.CREATE.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.CREATE.SC: {
            let { boards } = state;
          return {...state, boards: [...boards, action.data.board ], fetching: false, message: {negative: false}};
        }
        case ACTIONS.BOARD.CREATE.FL:
            console.log(action.data);
            return {...state, fetching: false, message: {info: action.data, negative: true}};
        case ACTIONS.BOARD.MESSAGE:
            return {...state, message: {}};
        case ACTIONS.BOARD.DROP.RQ:
            return {...state, fetching: true};
        case ACTIONS.BOARD.DROP.SC:
            const {id} = action.data;
            const {boards} = state;
            const obj = boards.find(b => id == b.id);
            if (boards.indexOf(obj) !== -1) {
                boards.splice(boards.indexOf(obj), 1);
            }
            return {...state, ...action.data, boards: [...boards], fetching: false, message: {negative: false}};
        case ACTIONS.BOARD.DROP.FL:
            return {...state, fetching: false,  message: {info: action.data, negative: true}};
        case ACTIONS.BOARD.CREATE_LIST.SC: {
            const { boards } = state;
            const {data, idBoard} = action;
            const changeBoard = boards.find(board => board.id == idBoard);
            changeBoard.lists = data.lists;
            const cpyBoards = boards.map(item => ({...item}));
            return {...state, boards: cpyBoards, message: {negative: false}}
        }
        case ACTIONS.BOARD.CREATE_LIST.FL:
            return {...state, fetching: false, message: {info: action.data, negative: true}};
        case ACTIONS.BOARD.DROP_LIST.SC: {
            const { boards } = state;
            const { boardId, listId } = action.data;
            const newBoards = boards.map(board => {
                if (board.id != boardId) return {...board};
                board.lists = board.lists.filter(l => l.id !== listId);
                return board;
            });
            return {...state, boards: newBoards, fetching: false, message: {negative: false}};
        }
        case ACTIONS.BOARD.DROP_LIST.FL:
            return {...state, fetching: false, message: {info: action.data, negative: true}};
        default:
            return state;
    }
}