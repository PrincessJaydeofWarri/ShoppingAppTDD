export const filterTasks = (filter, tasks) => filter
? tasks.filter(task => task.isComplete ===(filter === 'completed'))
: tasks
