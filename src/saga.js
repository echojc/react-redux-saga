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

function* deleteTodo() {
  const action = yield take('DELETE_TODO');
  const res = yield call(fetch, 'http://localhost:8899/delete', { method: 'POST', body: action.id });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

function* toggleTodo() {
  const action = yield take('TOGGLE_TODO');
  const res = yield call(fetch, 'http://localhost:8899/toggle', { method: 'POST', body: action.id });
  yield put({ type: 'SET_TODOS', todos: yield res.json() });
}

export default function*() {
  yield all([
    loadState(),
    addTodo(),
    deleteTodo(),
    toggleTodo(),
  ]);
}
