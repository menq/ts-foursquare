import { Epic } from 'redux-observable'
import { of } from 'rxjs/internal/observable/of'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { NStore } from '../../types/store'
import { TRootAction } from '../actions'
import {
  EVenuesAction,
  getVenueExploreAsync,
  getVenuesSearchAsync,
} from '../actions/venues'
import { adaptGetVenuesExplore, adaptGetVenuesSearch } from '../adapter/venues'
import {
  getObservableVenuesExplore,
  getObservableVenuesSearch,
} from '../services/venues'

export const getVenuesSearchEpic: Epic<
  TRootAction,
  TRootAction,
  NStore.IState
> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EVenuesAction.GET_VENUES_SEARCH_REQUEST)),
    switchMap(action =>
      getObservableVenuesSearch(action, state$).pipe(
        map(adaptGetVenuesSearch),
        map(getVenuesSearchAsync.success),
        catchError(err => of(getVenuesSearchAsync.failure(err))),
        takeUntil(
          action$.pipe(filter(isOfType(EVenuesAction.GET_VENUES_SEARCH_CANCEL)))
        )
      )
    )
  )

export const getVenuesExploreEpic: Epic<
  TRootAction,
  TRootAction,
  NStore.IState
> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(EVenuesAction.GET_VENUES_EXPLORE_REQUEST)),
    switchMap(action =>
      getObservableVenuesExplore(action, state$).pipe(
        map(adaptGetVenuesExplore),
        map(getVenueExploreAsync.success),
        catchError(err => of(getVenuesSearchAsync.failure(err))),
        takeUntil(
          action$.pipe(
            filter(isOfType(EVenuesAction.GET_VENUES_EXPLORE_CANCEL))
          )
        )
      )
    )
  )
