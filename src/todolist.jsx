import React from 'react';
import { connect } from 'react-redux';

import Todo from './todo';

const TodoList = ({ todos, addTodo, deleteTodo, toggleTodo }) => (
  <div>
    <h2>Todos</h2>
    <ul>
      {todos.map(todo =>
      <Todo
        key={todo.id}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        {...todo}
      />)}
    </ul>
    <input onKeyPress={e => e.key === 'Enter' && addTodo(e.target.value)} />
  </div>
);

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo(label) {
      dispatch({ type: 'ADD_TODO', label });
    },
    deleteTodo(id) {
      dispatch({ type: 'DELETE_TODO', id });
    },
    toggleTodo(id) {
      dispatch({ type: 'TOGGLE_TODO', id });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
