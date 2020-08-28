import React from 'react';
import { Link } from 'react-router-dom';
import './loading.scss';

const Loading = () => {
  return (
    <div className="page">
      <div className="main">
        <span>S</span>
        <span>A</span>
        <span>M</span>
        <span>S</span>
        <span className="letter"></span>
        <span>N</span>
      </div>
      <Link to="/auth">Home</Link>
    </div>
  )
}

export default Loading;
