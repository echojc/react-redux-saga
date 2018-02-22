import { call, put } from 'redux-saga/effects';

export default function* loadState() {
  const res = yield call(fetch, 'http://localhost:8899/');
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}
