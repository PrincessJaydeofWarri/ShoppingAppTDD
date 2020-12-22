import React from 'react'

const TaskItem = props =>
  <li className={props.isComplete ? "completed" : null}>
    <div className="view">
      <input className="toggle" type="checkbox"
      checked={props.isComplete}
      onChange={() => props.handleToggle(props.id)}/>
      <label>
        {props.name}
      </label>
      <button className="destroy"
        onClick={() => props.handleDelete(props.id)}/>
    </div>
  </li>

export default props =>
  <ul className="task-list">
    {props.tasks.map(task => <TaskItem key={task.id} {...task}
      handleDelete={props.handleDelete}
      handleToggle={props.handleToggle} />)}
  </ul>
