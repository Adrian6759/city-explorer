import React from 'react';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
    }
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <p>Welcome to the Main Component, Can you see this? <span onClick={this.toggleShow}>Click me to show something below</span></p>
        {this.state.show ? <p>This should render conditionally</p> : null}
      </div>
    )
  }
}

export default Main;