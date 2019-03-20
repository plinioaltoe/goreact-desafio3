import { call, put } from 'redux-saga/effects'
import api from '../../services/api'
import { Creators as RepositoryActions } from '../ducks/repository'

export function* addRepository(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`)

    const repositoryData = {
      id: data.id,
      name: data.full_name,
      description: data.description,
      url: data.html_url,
    }

    yield put(RepositoryActions.addRepositorySuccess(repositoryData))
  } catch (error) {
    yield put(RepositoryActions.addRepositoryFailure('Erro ao adicionar repositório'))
  }
}
