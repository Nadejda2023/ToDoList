import React, { useContext } from 'react';
import { Switch, Route, Redirect,} from 'react-router-dom';
import { publicRoutes, authRoutes } from '../routes';
import { Context } from '../index';
import { LOGIN_ROUTE, TODOLIST_ROUTE} from '../utils/constants';
import ToDoList from '../pages/ToDoList';

const AppRouter = () => {
    const {user} = useContext(Context) //<Route path={TODOLIST_ROUTE} component={ToDoList} exact />
    //console.log(user)
    //<Redirect to={LOGIN_ROUTE} /> <Redirect to = {LOGIN_ROUTE}/>
    return (
        <Switch>
        {publicRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} component={Component} exact />
        )}
        {authRoutes.map(({ path, Component }) =>
            <Route key={path} path={path} component={Component} exact />
        )}
        <Route path={TODOLIST_ROUTE}>
            {user.isAuth ? <ToDoList /> : <Redirect to={LOGIN_ROUTE} />}
        </Route>
        <Redirect to={LOGIN_ROUTE} />
    </Switch>
    );
}

export default AppRouter;