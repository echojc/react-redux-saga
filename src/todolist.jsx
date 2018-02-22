import React from 'react';

import Todo from './todo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], loading: true };
    this.loadState();
  }

  async loadState() {
    const res = await fetch('http://localhost:8899/');
    this.setState({ todos: await res.json(), loading: false });
  }

  async addTodo(label) {
    this.setState({
      todos: this.state.todos.concat({
        id: Math.random(),
        label,
        done: false,
      }),
      loading: true,
    });

    const res = await fetch('http://localhost:8899/add', {
      method: 'POST',
      body: label,
    });
    this.setState({ todos: await res.json(), loading: false });
  }

  async deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id),
      loading: true,
    });

    const res = await fetch('http://localhost:8899/delete', {
      method: 'POST',
      body: id,
    });
    this.setState({ todos: await res.json(), loading: false });
  }

  async toggleTodo(id) {
    const { todos } = this.state;
    const index = todos.findIndex(t => t.id === id);
    const todo = todos[index];
    const updated = {
      ...todo,
      done: !todo.done,
    };
    this.setState({
      todos: [].concat(todos.slice(0, index), updated, todos.slice(index + 1)),
      loading: true,
    });

    const res = await fetch('http://localhost:8899/toggle', {
      method: 'POST',
      body: id,
    });
    this.setState({ todos: await res.json(), loading: false });
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
        <div>{this.state.loading && 'loading...'}</div>
      </div>
    );
  }
}
