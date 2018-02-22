import React from 'react';

import Todo from './todo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.loadState();
  }

  async loadState() {
    const res = await fetch('http://localhost:8899/');
    this.setState({ todos: await res.json() });
  }

  async addTodo(label) {
    const res = await fetch('http://localhost:8899/add', {
      method: 'POST',
      body: label,
    });
    this.setState({ todos: await res.json() });
  }

  async deleteTodo(id) {
    const res = await fetch('http://localhost:8899/delete', {
      method: 'POST',
      body: id,
    });
    this.setState({ todos: await res.json() });
  }

  async toggleTodo(id) {
    const res = await fetch('http://localhost:8899/toggle', {
      method: 'POST',
      body: id,
    });
    this.setState({ todos: await res.json() });
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
