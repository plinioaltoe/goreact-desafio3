import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { Creators as RepositoryActions } from '../ducks/repository'

export function* addRepository(action) {
  try {
    const { payload } = action
    const { repository, latitude, longitude } = payload
    const { data } = yield call(api.get, `/users/${repository}`)

    const repositoryData = {
      id: data.id,
      name: data.name,
      login: data.login,
      avatar_url: data.avatar_url,
      repos_url: data.repos_url,
      latitude,
      longitude,
    }

    yield put(RepositoryActions.addRepositorySuccess(repositoryData))
  } catch (error) {
    yield put(RepositoryActions.addRepositoryFailure('Erro ao adicionar repositório'))
  }
}
