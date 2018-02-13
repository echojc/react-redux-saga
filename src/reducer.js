const defaultState = {
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

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: state.todos.concat({
          id: Math.random(),
          label: action.label,
          done: false,
        }),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'TOGGLE_TODO':
      const index = state.todos.findIndex(todo => todo.id === action.id);
      return {
        ...state,
        todos: [].concat(
          state.todos.slice(0, index),
          {
            ...state.todos[index],
            done: !state.todos[index].done,
          },
          state.todos.slice(index + 1),
        ),
      };
    default:
      return state;
  }
}
