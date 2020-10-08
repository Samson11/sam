import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';
import './loading.scss';
const db = window.require('electron-db')

class Loading extends Component {
  state = {
    redirect: false,
    route: '/requirements'
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
    db.getAll('installation', (succ, data) => {
      if(succ) {
        this.setState({ route: '/first-project'})
      }
    })
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    document.title = 'S.A.M'
    return this.state.redirect
        ? <Redirect to={this.state.route} />
        : <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className="loader__body">
            <CircularProgress />
          </div>
        </Slide>
  }
}

export default Loading;
