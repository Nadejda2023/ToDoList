import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Button, Container, Form, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import EditAndCreateModalWindow from './modal'
import { Context } from '..';
import { observer } from 'mobx-react';
import { changeTasks, createTasks, fetchTasks, updateTasks } from '../components/http/taskAPI';
import { jwtDecode } from 'jwt-decode';

const ToDoList = observer( () => {
  // eslint-disable-next-line no-unused-vars
  const { user, tasks } = useContext(Context); 
  const taskProfile = tasks
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [responsibleUserId, setResponsibleUserId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [userTasks, setUserTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filteredByUser, setFilteredByUser] = useState([]);
 
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
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [decodedToken, setDecodedToken] = useState(null);


  const openModal = (task) => {
    setSelectedTask(task); 
    setNewTask(true); 
  }

  // eslint-disable-next-line no-unused-vars
  const handleResponsibleUserIdChange = event => {
    setResponsibleUserId(event.target.value);
    handleModalSubmit(); 
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.roles;
    const admin = userRoles && userRoles.some(role => role.value === 'ADMIN');
    setIsAdmin(admin); 
      console.log('User roles:', userRoles);
      console.log('Is admin:', admin);
  }
}, []);

  // eslint-disable-next-line no-unused-vars
  const handleDateFilterChange = (filter, decodedToken) => {
    if (!decodedToken || !decodedToken.id) {
      console.error('Декодированный токен или идентификатор пользователя отсутствует.');
      return;
    }
  
    const userId = decodedToken.id; 
    let filteredTasks = taskProfile._tasks.filter(task => task.responsiblePerson === userId);
  
    switch (filter) {
      case 'today':
        filteredTasks = filteredTasks.filter(task => {
          const taskDate = new Date(task.expirationDate);
          const isSameDate = taskDate.toDateString() === new Date().toDateString();
          return isSameDate;
        });
        break;
      case 'week':
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        filteredTasks = filteredTasks.filter(task => {
          const taskDate = new Date(task.expirationDate);
          return taskDate <= nextWeek;
        });
        break;
      case 'future':
        filteredTasks = filteredTasks.filter(task => {
          const taskDate = new Date(task.expirationDate);
          return taskDate > new Date();
        });
          break;
      default:
        break;
    }
  
    setFilter(filter);
    setFilteredTasks(filteredTasks);
  };

  const handleModalSubmit = () => {
    
    const userId = parseInt(responsibleUserId);
    if (isNaN(userId)) {
      console.log('Введите корректный идентификатор пользователя');
      return;
    }
    const filteredByUser = taskProfile._tasks.filter(task => task.responsiblePerson === userId);
    setFilteredByUser(filteredByUser);
    setFilteredTasks(filteredByUser); 
    console.log('таски по ответственному', filteredByUser);
  };

  const handleShowAllTasks = () => {
    setFilter(null); 
    setFilteredTasks(taskProfile._tasks);
  };
  const handleEditOrCreateTask = async (formData, taskId) => {
    if (isAdmin) {
      if (taskId) {
        await updateTasks(formData, taskId);
      } else {
        await createTasks(formData);
      }
    } else {
      await changeTasks(formData.status, taskId);
    }
  };
  
  return (
    <Container>
<div>
        <Button className="mt-3  mx-2" onClick={() => handleDateFilterChange('today', decodedToken)}>Сегодня</Button>
        <Button className="mt-3  mx-2" onClick={() => handleDateFilterChange('week', decodedToken)}>На неделю</Button>
        <Button className="mt-3  mx-2" onClick={() => handleDateFilterChange('future', decodedToken)}>На будущее</Button>
        {isAdmin && (
          <Button className="mt-3  mx-2" onClick={handleShowAllTasks}>Показать все задачи</Button>
        )}
        {isAdmin  && (
       <Button Button className="mt-3 mx-2 float-right" onClick={() => { handleModalSubmit(); setFilter('user'); }}>Группировка по ответственным</Button>
       
)}
   <Form.Group controlId="formResponsibleUserId"  className="mt-3 mx-2 float-right">
        <Form.Label>Введите идентификатор пользователя для поиска задач по ответственному сотруднику:</Form.Label>
        <Form.Control
        className="mt-3 mx-2 float-right"
          type="text"
          value={responsibleUserId}
          onChange={e => setResponsibleUserId(e.target.value)}
          size="sm"
        />
      </Form.Group>
      </div>
      {isAdmin && (
        <Button
          variant={"outline-dark"}
          className="mt-4 mb-2 float-right p-4 mx-2"
          onClick={() => setNewTask(true)}
          taskId={setSelectedTask.taskId}
        >
          Новая задача
        </Button>
      )}
       <EditAndCreateModalWindow
        show={newTask}
        onHide={() => setNewTask(false)}
        task={selectedTask}
        isAdmin={isAdmin}
        onSubmit={handleEditOrCreateTask}
      />
      
      <ListGroup className="mt-4">
  {filteredTasks.length === 0 ? (
    <ListGroupItem>
      {filter === 'today' && userTasks.length === 0
        ? 'У вас нет задач на сегодня'
        : 'У вас нет задач, удовлетворяющих выбранным фильтрам'}
    </ListGroupItem>
  ) : (
    filteredTasks.map(taskItem => (
      <ListGroupItem key={taskItem.id} onClick={() => openModal(taskItem)}>
        <div
          style={{
            color: getTaskColor(taskItem.status, taskItem.expirationDate),
          }}
        >
          {taskItem.title}
        </div>
        <div>Приоритет: {taskItem.priority}</div>
        <div>Дата окончания: {taskItem.expirationDate}</div>
        <div>Ответственный: {taskItem.responsiblePerson}</div>
        <div>Статус: {taskItem.status}</div>
      </ListGroupItem>
    ))
  )}
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

