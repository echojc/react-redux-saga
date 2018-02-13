import React from 'react';

const todos = [
  'bootstrap a single page app',
  'learn about react',
  'encroach upon redux territory',
  'tell of epics and sagas',
];

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
      </div>
    );
  }
}
