const USERINFO_LOGIN = 'USERINFO_LOGIN'

const initialState = {}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case USERINFO_LOGIN:
            return action.data
        default:
            return state
    }
}
