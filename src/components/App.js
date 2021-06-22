import React from 'react';
import { hot } from 'react-hot-loader/root';
import Contact from './Contact';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return <Contact></Contact>;
  }
}

export default hot(App);
