import React from 'react';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        'bootstrap a single page app',
        'learn about react',
        'encroach upon redux territory',
        'tell of epics and sagas',
      ],
    };
  }

  addTodo(todo) {
    this.setState({ todos: this.state.todos.concat(todo) });
  }

  deleteTodo(todo) {
    this.setState({ todos: this.state.todos.filter(t => t !== todo) });
  }

  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.state.todos.map(todo => (
          <li
            key={todo}
          >
            {todo}
            <span onClick={() => this.deleteTodo(todo)}>[X]</span>
          </li>
          ))}
        </ul>
        <input onKeyPress={e => e.key === 'Enter' && this.addTodo(e.target.value)} />
      </div>
    );
  }
}
