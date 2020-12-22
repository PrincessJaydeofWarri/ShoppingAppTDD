import React from 'react'

export default props =>
  <form onSubmit={props.handleTaskSubmit}>
    <input
      type='text'
      autoFocus
      value={props.currentTask}
      onChange={props.handleNewTaskChange}
      className="new-task"
      placeholder="Whats on the list?"/>
  </form>
