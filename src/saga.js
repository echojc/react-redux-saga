import { call, put, take, all } from 'redux-saga/effects';

function* loadState() {
  const res = yield call(fetch, 'http://localhost:8899/');
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

function* addTodo() {
  const action = yield take('ADD_TODO');
  const res = yield call(fetch, 'http://localhost:8899/add', { method: 'POST', body: action.label });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

export default function*() {
  yield all([
    loadState(),
    addTodo(),
  ]);
}
