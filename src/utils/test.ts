import { ActionsObservable } from 'redux-observable'
import { Subject } from 'rxjs/internal/Subject'
import { take, toArray } from 'rxjs/operators'
import { Action } from 'typesafe-actions'

export const mockingFetch = ({ response = {} } = {}) => {
  const mockJsonPromise = Promise.resolve(response)
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    ok: true,
  })

  // @ts-ignore
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
}

export const testEpic = (
  epic: Function,
  count: number,
  action: Action,
  callback: Function,
  state = {}
) => {
  const actions = new Subject<Action>()
  const actions$ = new ActionsObservable(actions)
  const store = { getState: () => state, value: state }

  epic(actions$, store)
    .pipe(
      take(count),
      toArray()
    )
    .subscribe(callback)

  actions.next(action)
}
