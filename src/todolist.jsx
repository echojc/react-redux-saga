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
          {this.state.todos.map(todo => (
          <li
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => this.toggleTodo(todo.id)}
              />
              {todo.label}
            </label>
            <span onClick={() => this.deleteTodo(todo.id)}>[X]</span>
          </li>
          ))}
        </ul>
        <input onKeyPress={e => e.key === 'Enter' && this.addTodo(e.target.value)} />
      </div>
    );
  }
}
