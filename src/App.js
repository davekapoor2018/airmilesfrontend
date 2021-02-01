import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import PostApp from './components/posts-list.component';

class App extends Component {
  render() {
    return (<div className="container">
    <PostApp />
  </div>
    )
  }
}

export default App;
