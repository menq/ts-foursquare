import { StateObservable } from 'redux-observable'
import { Subject } from 'rxjs'
import { initialState } from '../../src/DEPRECATED_reducers'
import { getDefaultRequestParameters } from '../../src/services/fetch'
import { NStore } from '../../types'

describe('utils/fetch/getDefaultRequestParameters', () => {
  it('should get default request parameters', () => {
    const state$: StateObservable<NStore.IState> = new StateObservable(
      new Subject(),
      {
        ...initialState,
        life: {
          ...initialState.life,
          credentials: {
            ...initialState.life.credentials,
            clientId: '123',
            clientSecret: '456',
          },
        },
      }
    )

    expect(getDefaultRequestParameters(state$)).toMatchSnapshot()
  })
  it('should get default logged request parameters', () => {
    const state$: StateObservable<NStore.IState> = new StateObservable(
      new Subject(),
      {
        ...initialState,
        life: {
          ...initialState.life,
          credentials: {
            ...initialState.life.credentials,
            accessToken: '789',
            clientId: '123',
            clientSecret: '456',
          },
        },
      }
    )

    expect(getDefaultRequestParameters(state$)).toMatchSnapshot()
  })
})
