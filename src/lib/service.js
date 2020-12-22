import axios from 'axios'

export const saveTask = (task) =>
axios.post('http://localhost:3030/api/tasks', task)

export const loadTasks = () =>
axios.get('http://localhost:3030/api/tasks')

export const destroyTask = (id) =>
axios.delete(`http://localhost:3030/api/tasks/${id}`)

export const updateTask = (task) =>
axios.put(`http://localhost:3030/api/tasks/${task.id}`, task)
