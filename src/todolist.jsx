import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          label: 'bootstrap a single page app',
          done: true,
        },
        {
          id: 2,
          label: 'learn about react',
          done: false,
        },
        {
          id: 3,
          label: 'encroach upon redux territory',
          done: false,
        },
        {
          id: 4,
          label: 'tell of epics and sagas',
          done: false,
        }
      ],
    };
  }

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
          {this.state.todos.map(todo =>
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

class Todo extends React.Component {
  render() {
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={() => this.props.onToggle(this.props.id)}
          />
          {this.props.label}
        </label>
        <span onClick={() => this.props.onDelete(this.props.id)}>[X]</span>
      </li>
    );
  }
}
