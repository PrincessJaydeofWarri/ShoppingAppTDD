import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import Footer from './Footer'
import logo from '../images/dloglow1.png'
import {saveTask, loadTasks, destroyTask, updateTask} from '../lib/service'
import {filterTasks} from '../lib/utils'




export default class ShoppingListApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTask: '',
      tasks: []
    }
    this.handleNewTaskChange = this.handleNewTaskChange.bind(this)
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  componentDidMount () {
    loadTasks().then(({data}) => this.setState({tasks: data}))
    .catch(() => this.setState({error: true}))
  }

handleNewTaskChange(evt) {
  this.setState({currentTask: evt.target.value})
}

handleDelete(id){
  destroyTask(id).then(() => this.setState({tasks: this.state.tasks.filter(t => t.id !== id)}))
}

handleToggle (id) {
  const targetTask = this.state.tasks.find(t => t.id === id)
  const updated = {
    ...targetTask, isComplete: !targetTask.isComplete}
  updateTask(updated).then(({data}) => {
    const tasks = this.state.tasks.map(t => t.id === data.id ? data : t)
    this.setState({tasks: tasks})
  })

}

handleTaskSubmit (evt) {
  evt.preventDefault()
  const newTask = {name: this.state.currentTask, isComplete: false}
      saveTask(newTask).then(({data}) => this.setState({tasks: this.state.tasks.concat(data),
      currentTask: ''

    }))
    .catch(() => this.setState({error: true}))

}
  render () {
    const remaining = this.state.tasks.filter(t => !t.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <img src={logo} alt="developherj-logo"/>
            <h1>Shopping List</h1>
            {this.state.error ? <span className='error'>Cant be done!</span> : null}
            <TaskForm currentTask={this.state.currentTask}
              handleTaskSubmit={this.handleTaskSubmit}
              handleNewTaskChange={this.handleNewTaskChange}/>
          </header>
          <section className="main">
          <Route path='/:filter?' render={({match}) =>
            <TaskList tasks={filterTasks(match.params.filter, this.state.tasks)}
              handleDelete={this.handleDelete}
              handleToggle={this.handleToggle}/>
          } />

          </section>
          <Footer remaining={remaining}/>
        </div>
      </Router>
    )
  }
}
