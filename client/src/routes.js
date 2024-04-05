import { LOGIN_ROUTE, REGISTRATION_ROUTE, TODOLIST_ROUTE } from './utils/constants';
import ToDoList from "./pages/ToDoList";
import Auth from './pages/auth';

export const authRoutes = [

{
    path: TODOLIST_ROUTE, 
    Component: ToDoList
},
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]