import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { readConfigRequest, readConfigResponse } from 'secure-electron-store';
import './loading.scss';

class Loading extends Component {
  state = {
    redirect: false,
    installed: false
  }

  componentDidMount() {
    //window.api.store.clearRendererBindings();
    // this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    /**const myNotification = new Notification('Title', {
      body: 'Sup',
      image: '../../assets/samson.gif',
      icon: '../../assets/samson.gif'
    })*/
    //myNotification.onclick = () => console.log('Clicked Noti')
    document.title = 'S.A.M'
    return this.state.redirect
        ? <Redirect to="/requirements" />
        :  <div className="loader__body">
            <CircularProgress />
          </div>
  }
}

export default Loading;
