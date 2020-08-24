import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './Components/loading/loading'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route route='/' component={Loading}/>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
