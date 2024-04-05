import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { publicRoutes, authRoutes } from '../routes';
import { Context } from '../index';
import { TODOLIST_ROUTE } from '../utils/constants';
import ToDoList from '../pages/ToDoList';

const AppRouter = () => {
    const {user} = useContext(Context) //<Route path={TODOLIST_ROUTE} component={ToDoList} exact />
    //console.log(user)
    //<Redirect to={LOGIN_ROUTE} /> <Redirect to = {LOGIN_ROUTE}/>
    return (
            <Switch>
                <Route path={TODOLIST_ROUTE} component={ToDoList} exact />
                {user.isAuth && authRoutes.map(({ path, Component }) =>
                   <Route key={path} path={path} component={Component} exact />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} component={Component} exact />
                )}
               
            </Switch>
        
    );
}

export default AppRouter;