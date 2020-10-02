import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading.scss';

class Loading extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return this.state.redirect
        ? <Redirect to="/requirements" />
        :  <div className="loader__body">
            <CircularProgress />
          </div>
  }
}

export default Loading;
