import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/loading/loading';
import Installer from './components/install/install';
import Requirements from './components/requirements/requirements';
import Introduction from './components/introduction/introduction';
import About from './components/about/about';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Loading} />
        <Route path='/requirements' component={Requirements} />
        <Route path='/install' component={Installer} />
        <Route path='/intro' component={Introduction} />
        <Route path='/about' component={About} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
