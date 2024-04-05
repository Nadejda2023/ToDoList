import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '..';
import { changeTasks, updateTasks } from '../components/http/taskAPI';

const EditAndCreateModalWindow = ({ show, onHide, title, isAdmin }) => {
  // eslint-disable-next-line no-unused-vars
  const { tasks } = useContext(Context);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    expirationDate: '',
    status: '',
    responsibleUserId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      if (isAdmin) {
        await updateTasks(formData);
        console.log('Данные успешно добавлены:', formData);
      } else {
        // Если не админ, то обновляем только статус задачи
        console.log('Обновление статуса задачи:', formData.status);
        await changeTasks(formData.status);
      }
      onHide();
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
              {isAdmin ? 'Добавить новую задачу!' : 'Редактировать задачу'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            placeholder="Введите название задачи"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите описание задачи"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите приоритет задачи (high/middle/low)"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите дату завершения (2024-04-1)"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
          {(
            <Form.Control
              className="mt-3"
              placeholder="Введите статус выполнения задачи (to perform/in progress/is done/canceled)"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />
          )}
          <Form.Control
            className="mt-3"
            placeholder="Введите идентификационный номер сотрудника, ответственного за задачу"
            name="responsibleUserId"
            type="number"
            value={formData.responsibleUserId}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          {isAdmin ? 'Добавить' : 'Обновить статус'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditAndCreateModalWindow;