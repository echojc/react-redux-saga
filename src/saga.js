import { call, put, all, takeEvery } from 'redux-saga/effects';

function* loadState() {
  const res = yield call(fetch, 'http://localhost:8899/');
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

function* addTodo(action) {
  const res = yield call(fetch, 'http://localhost:8899/add', { method: 'POST', body: action.label });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

function* deleteTodo(action) {
  const res = yield call(fetch, 'http://localhost:8899/delete', { method: 'POST', body: action.id });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

function* toggleTodo(action) {
  const res = yield call(fetch, 'http://localhost:8899/toggle', { method: 'POST', body: action.id });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

export default function*() {
  yield all([
    loadState(),
    takeEvery('ADD_TODO', addTodo),
    takeEvery('DELETE_TODO', deleteTodo),
    takeEvery('TOGGLE_TODO', toggleTodo),
  ]);
}
