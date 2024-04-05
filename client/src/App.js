import React, {useContext, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
// import {Spinner} from "react-bootstrap";
// import { registration } from './components/http/userAPI';

const App = observer(() => {
    // eslint-disable-next-line no-unused-vars
    const {user} = useContext(Context)
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true)

  //   useEffect(() => {
  //     registration().then(data => {
  //         user.setUser(data); 
  //         user.setIsAuth(true); 
  //     }).finally(() => setLoading(false));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //   if (loading) {
  //       return <Spinner animation={"grow"}/>
  //   }

    return (
        <BrowserRouter>
          
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;