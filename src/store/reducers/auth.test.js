/* eslint-disable no-undef */
import reducer from './auth'
import * as actionTypes from '../actions/actionsTypes'

describe('auth reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            localId: null,
            error: null,
            isLoading: false,
            authRedirectPath: '/'
        })
    })

    it('should store token upon login', () => {
        expect(reducer({
            idToken: null,
            localId: null,
            error: null,
            isLoading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            localId: 'some-local-id'
        })).toEqual({
            idToken: 'some-token',
            localId: 'some-local-id',
            error: null,
            isLoading: false,
            authRedirectPath: '/'
        })
    })
})
