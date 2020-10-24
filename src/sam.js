import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loading from './components/loading/loading';
import Installer from './components/install/install';
import Requirements from './components/requirements/requirements';
import Introduction from './components/introduction/introduction';
import About from './components/about/about';
import Installation from './components/installation/installation';
import FirstTime from './components/first-time-project/firstTime';
import Settings from './components/settings/settings';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/profile/profile';
import Subscription from './components/subscriptions/subscription';
import Create from './components/create-project/create';
import GetScreens from './components/screen-recorder/chooseScreen';
import GetProjectData from './components/project-view/viewer';
import Recorder from './components/screen-recorder/recorder';
import GetTimeline from './components/project-view/timeline';
import Screenshot from './components/screenshot/screenshot';
import TimelineViewer from './components/project-view/timeline-viewer';

const SAM = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Loading} />
        <Route path='/requirements' component={Requirements} />
        <Route path='/install' component={Installer} />
        <Route path='/intro' component={Introduction} />
        <Route path='/about' component={About} />
        <Route path='/installation' component={Installation} />
        <Route path='/first-project' component={FirstTime} />
        <Route path='/settings' component={Settings} />
        <Route path='/home' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/subscription' component={Subscription} />
        <Route path='/create-project' component={Create} />
        <Route path='/choose-screen' component={GetScreens} />
        <Route path='/record' component={Recorder} />
        <Route path='/viewer/' component={GetProjectData} />
        <Route path='/timeline/' component={GetTimeline} />
        <Route path='/screenshot' component={Screenshot} />
        <Route path='/timeline-preview' component={TimelineViewer} />
      </Switch>
    </BrowserRouter>
  )
}

export default SAM;
