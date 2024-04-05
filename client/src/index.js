import React, { createContext } from 'react';
import { createRoot } from "react-dom/client"; // Добавлен импорт ReactDOM
import App from './App';
import UserProfile from './to-do-list/UserProfile';
import TaskProfile from './to-do-list/TaskProfile';

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL);

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserProfile(),
    tasks: new TaskProfile(),
  }}>
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

