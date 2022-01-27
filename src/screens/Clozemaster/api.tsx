import { ipv4Address } from "../../global/constants"

const types = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export const actionCreators = {
    loading: () => ({ type: types.LOADING }),
    failure: () => ({ type: types.FAILURE }),
    // @ts-ignore
    success: (payload) => ({ type: types.SUCCESS, payload }),
}

export const initialState = {
    loading: true,
    error: false,
    sentences: [],
}

// @ts-ignore
export function reducer(state, action) {
    switch (action.type) {
        case types.LOADING:
            return { ...state, loading: true, error: false }
        case types.SUCCESS:
            return { loading: false, error: false, sentences: action.payload }
        case types.FAILURE:
            return { ...state, loading: false, error: true }
    }
}

export function getClozemasterUrl() {
    return 'http://' + ipv4Address + ':5000/clozemaster';
}

export function getSentenceUrl() {
    return 'http://' + ipv4Address + ':5000/sentence';
}


