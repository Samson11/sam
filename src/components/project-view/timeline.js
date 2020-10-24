import React , { Component, useEffect, useState } from 'react';
import { SimpleTimel, ColoredTimel, OutlinedTimel, AdvancedTimel, OppositeTimel } from './timeline-layout';
import Header from '../header/header';

class GetTimeline extends Component {
  render() {
    const selection = this.props.location.pathname.split('/timeline/')[1];

    if(selection === 'basic') {
      return (
        <div>
          <Header title="New Timeline" />
            <SimpleTimel />
        </div>
      )
    }
    if(selection === 'colored') {
      return (
        <div>
          <Header title="New Timeline" />
            <ColoredTimel />
        </div>
      )
    }
    if(selection === 'outlined') {
      return (
        <div>
          <Header title="New Timeline" />
            <OutlinedTimel />
        </div>
      )
    }
    if(selection === 'opposite') {
      return (
        <div>
          <Header title="New Timeline" />
            <OppositeTimel />
        </div>
      )
    }
    if(selection === 'advanced') {
      return (
        <div>
          <Header title="New Timeline" />
            <AdvancedTimel />
        </div>
      )
    }
  }
}

export default GetTimeline;
