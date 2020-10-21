import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getData } from '../../database';
import './loading.scss';

class Loading extends Component {
  state = {
    redirect: false,
    route: '/requirements'
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
    getData('installation')
    .then((data) => data[0].installed ? this.setState({ route: '/first-project'}) : this.setState({ route: '/requirements'}))
    .catch(err => alert(err))
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    document.title = 'S.A.M'
    return this.state.redirect
        ? <Redirect to={this.state.route} />
        : <div className="loader__body">
            <CircularProgress />
          </div>
  }
}

export default Loading;
