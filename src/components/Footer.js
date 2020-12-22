import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
  <footer className="footer">
    <span className="task-count">
      <strong>{props.remaining}</strong>
        {props.remaining === 1 ? ' items' : ' items'} left
    </span>
    <ul className="filters">
      <li><Link to="/">All</Link></li>
      {' '}
      <li><Link to="/active">Active</Link></li>
      {' '}
      <li><Link to="/completed">Completed</Link></li>
    </ul>
  </footer>
