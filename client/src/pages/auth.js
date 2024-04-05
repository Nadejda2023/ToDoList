import React, { useContext, useState } from 'react';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TODOLIST_ROUTE } from '../utils/constants';
import { login, registration } from '../components/http/userAPI';
import { observer } from 'mobx-react';
import { Context } from '..';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(loginOrEmail, password);
      } else {
        data = await registration(loginOrEmail, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      history.push(TODOLIST_ROUTE); 
    } catch (e) {
      alert(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш логин>>>"
            value={loginOrEmail}
            onChange={e => setLoginOrEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль>>>"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Регистрируйтесь!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <Col className="mt-3 d-flex justify-content-end">
              <Button variant={"outline-success"} onClick={click}>
                {isLogin ? 'Войти' : 'Регистрация'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;