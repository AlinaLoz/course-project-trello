import {Xhr} from "../../services/Xhr";
import {ACTIONS} from "../constans";

export const getTeams = (numberPage) => dispatch => {
    dispatch({type: ACTIONS.TEAM.GET.RQ});
    Xhr.getTeams(numberPage).then(resp => {
        dispatch({
            type: ACTIONS.TEAM.GET.SC,
            data: resp
        })
    }).catch(err => {
        dispatch({
            type: ACTIONS.TEAM.GET.FL,
            data: err
        })
    });
};

export const checkExistUser = (login) => dispatch => {
    dispatch({type: ACTIONS.TEAM.USER_TEST.RQ});
    Xhr.checkExistUser(login).then(resp => {
        dispatch({
            type: ACTIONS.TEAM.USER_TEST.SC,
            data: resp
        })
    }).catch(err => {
        console.log('error');
        dispatch({
            type: ACTIONS.TEAM.USER_TEST.FL,
            data: err
        })
    });
};

export const createTeam = (name, users) => dispatch => {
    dispatch({type: ACTIONS.TEAM.CREATE.RQ});
    Xhr.createTeam(name, users).then(resp => {
        dispatch({
            type: ACTIONS.TEAM.CREATE.SC,
            data: resp
        })
    }).catch(err => {
        dispatch({
            type: ACTIONS.TEAM.CREATE.FL,
            data: err
        })
    });
};

export const dropTeam = (numberPage, id) => dispatch => {
    dispatch({type: ACTIONS.TEAM.DROP.RQ});

    Xhr.dropTeam(numberPage, id).then(resp => {
        dispatch({
            type: ACTIONS.TEAM.DROP.SC,
            data: resp
        })
    }).catch(err => {
        dispatch({
            type: ACTIONS.TEAM.DROP.FL,
            data: err
        })
    });
};

export const getOneTeam = (id) => dispatch => {
    Xhr.getOneTeam(id).then(resp => {
        dispatch({
            type: ACTIONS.ONE_TEAM.GET.SC,
            data: {...resp.team},
            id
        })
    }).catch(err => {
        dispatch({
            type: ACTIONS.ONE_TEAM.GET.FL,
            data: err
        })
    });
};


export const updateName = (id, name) => dispatch => {
    Xhr.updateNameTeam(id, name).then(resp => {
        dispatch({
            type: ACTIONS.ONE_TEAM.UPDATE_NAME.SC,
            data: resp,
        })
    }).catch(err => {
        dispatch({
            type: ACTIONS.ONE_TEAM.UPDATE_NAME.FL,
            data: err
        })
    });
};

export const dropMessage = (id) => dispatch => {
    dispatch({type: ACTIONS.TEAM.MESSAGE});
};