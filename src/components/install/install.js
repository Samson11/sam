import React, { Component } from 'react';
import './install.scss';
import { connect } from 'react-redux';

class Installer extends Component {
  state = {
    username: '',
    name: ''
  };
  
  render() {
    return (
      <div>
        Hi where are you
        <h1> Hello </h1>
      </div>
    )
  }
}

const mapStatesToProps = (state) => {
  return {
    projects: state.project.projects
  }
}

export default connect(mapStatesToProps)(Installer);
