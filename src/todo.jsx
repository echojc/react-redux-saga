import React from 'react';

export default ({ id, label, done, uncommitted, onToggle, onDelete }) => (
  <li
    style={{
      color: uncommitted && 'lightgrey',
      fontStyle: uncommitted && 'italic',
    }}
  >
    <label>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
      />
      {label}
    </label>
    <span onClick={() => onDelete(id)}>[X]</span>
  </li>
);
