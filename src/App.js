import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/loading/loading';
import Installer from './components/install/install';
import Authentication from './components/authentication/authentication';
import Introduction from './components/introduction/introduction';
import Switcher from './components/themeSwitcher/switcher';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switcher />
      <Switch>
        <Route exact path='/' component={Loading} />
        <Route path='/auth' component={Authentication} />
        <Route path='/install' component={Installer} />
        <Route path='/intro' component={Introduction} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
