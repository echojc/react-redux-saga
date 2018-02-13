import React from 'react';

export default ({ id, label, done, onToggle, onDelete }) => (
  <li>
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
