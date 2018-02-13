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
  return state;
}
