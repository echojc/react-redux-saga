import React from 'react';
import { connect } from 'react-redux';

import Todo from './todo';

class TodoList extends React.Component {
  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.props.todos.map(todo =>
          <Todo
            key={todo.id}
            onToggle={this.props.toggleTodo}
            onDelete={this.props.deleteTodo}
            {...todo}
          />)}
        </ul>
        <input onKeyPress={e => e.key === 'Enter' && this.props.addTodo(e.target.value)} />
      </div>
    );
  }
}

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
