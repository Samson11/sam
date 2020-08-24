import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/loading/loading';
import './App.scss';

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
