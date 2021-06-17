import React from 'react';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ name: 'jaein' });
          }}
        >
          click me
        </button>
        <h1>Hellfo{this.state.name}</h1>
      </div>
    );
  }
}

export default hot(App);
