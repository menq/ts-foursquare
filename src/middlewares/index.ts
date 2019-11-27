import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { NStore } from '../../types'
import { TRootAction } from '../actions'
import {
  getAccessTokenEpic,
  getListsEpic,
  getPhotosDetailsEpic,
  getVenuesCategoriesEpic,
  getVenuesExploreEpic,
  getVenuesLikesEpic,
  getVenuesListedEpic,
  getVenuesNextVenuesEpic,
  getVenuesSearchEpic,
  getVenuesSimilarEpic,
  getVenuesSuggestCompletionEpic,
  getVenuesTrendingEpic,
} from '../epics'

export const rootEpic = combineEpics(
  getAccessTokenEpic,
  getListsEpic,
  getPhotosDetailsEpic,
  getVenuesCategoriesEpic,
  getVenuesExploreEpic,
  getVenuesLikesEpic,
  getVenuesListedEpic,
  getVenuesNextVenuesEpic,
  getVenuesSearchEpic,
  getVenuesSimilarEpic,
  getVenuesSuggestCompletionEpic,
  getVenuesTrendingEpic
)
export const epicMiddleware = createEpicMiddleware<
  TRootAction,
  TRootAction,
  NStore.IState
>()
