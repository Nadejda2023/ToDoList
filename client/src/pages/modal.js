import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditAndCreateModalWindow = ({ show, onHide, task, isAdmin, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: task ? task.title : '',
    description: task ? task.description : '',
    priority: task ? task.priority : '',
    expirationDate: task ? task.expirationDate : '',
    status: task ? task.status : '',
    responsibleUserId: task ? task.responsibleUserId : ''
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
      await onSubmit(formData, task ? task.id : null);
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
          {task ? 'Редактировать задачу' : 'Добавить новую задачу'}
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
          {isAdmin && (
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
            value={formData.responsibleUserId}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          {task ? 'Обновить задачу' : 'Добавить задачу'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditAndCreateModalWindow;
