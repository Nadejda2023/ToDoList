import React, {useContext, useEffect, useState } from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import EditAndCreateModalWindow from './modal'
import { Context } from '..';
import { observer } from 'mobx-react';
import { fetchTasks } from '../components/http/taskAPI';

const ToDoList = observer( () => {
  // eslint-disable-next-line no-unused-vars
  const { user, tasks } = useContext(Context); 
  const taskProfile = tasks
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true); 
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false); 
 

  useEffect(() => {
    fetchTasks().then(data => {
        tasks.setTasks(data);
    }).catch(error => {
        console.error('Error fetching tasks:', error);
    }).finally(() => setLoading(false));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  
  const [newTask, setNewTask ] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null);


  const openModal = (task) => {
    setSelectedTask(task); 
    setNewTask(true); 
  }

  return (
    <Container>
    <Button
      variant={"outline-dark"} 
      className="mt-4 mb-2 float-right p-2"
      onClick={() => setNewTask(true)}
    >
      Новая задача
    </Button>
    <EditAndCreateModalWindow show={newTask} onHide={() => setNewTask(false)}
     title={selectedTask ? 'Отредактировать задачу' : 'Добавить новую задачу'}
     task={selectedTask}
    
     />
    
    <ListGroup>
      {taskProfile._tasks.map(taskItem => (
        <ListGroupItem key={taskItem.id} onClick={() => openModal(taskItem)}>
          <div style={{ color: getTaskColor(taskItem.status, taskItem.expirationDate) }}>
            {taskItem.title}
          </div>
          <div>Приоритет: {taskItem.priority}</div>
          <div>Дата окончания: {taskItem.expirationDate}</div>
          <div>Ответственный: {taskItem.responsibleUser}</div>
          <div>Статус: {taskItem.status}</div>
        </ListGroupItem>
      ))}
    </ListGroup>
  </Container>
);
})

const getTaskColor = (status, expirationDate) => {
  const currentDate = new Date();
  const taskExpirationDate = new Date(expirationDate);

  if (status === 'is done') {
    return 'green';
  } else if (status === 'in progress') {
    return 'gray';
  } else if (taskExpirationDate < currentDate) {
    return 'red';
  } else {
    return 'grey';
  }
}


export default ToDoList;

