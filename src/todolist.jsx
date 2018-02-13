import React from 'react';
import { connect } from 'react-redux';

import Todo from './todo';

class TodoList extends React.Component {
  addTodo(label) {
    this.setState({
      todos: this.state.todos.concat({
        id: Math.random(),
        label,
        done: false,
      }),
    });
  }

  deleteTodo(id) {
    this.setState({ todos: this.state.todos.filter(t => t.id !== id) });
  }

  toggleTodo(id) {
    const { todos } = this.state;
    const index = todos.findIndex(t => t.id === id);
    const todo = todos[index];
    const updated = {
      ...todo,
      done: !todo.done,
    };
    this.setState({ todos: [].concat(todos.slice(0, index), updated, todos.slice(index + 1)) });
  }

  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.props.todos.map(todo =>
          <Todo
            key={todo.id}
            onToggle={this.toggleTodo.bind(this)}
            onDelete={this.deleteTodo.bind(this)}
            {...todo}
          />)}
        </ul>
        <input onKeyPress={e => e.key === 'Enter' && this.addTodo(e.target.value)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps)(TodoList);
