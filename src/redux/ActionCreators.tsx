import * as ActionTypes from './ActionTypes';

export const loginAction = (payload: string) => ({
    type: ActionTypes.LOGIN_ACTION,
    payload: payload
})

export const logoutAction = () => ({
    type: ActionTypes.LOGOUT_ACTION
})