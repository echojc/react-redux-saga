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

  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {this.state.todos.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
      </div>
    );
  }
}
