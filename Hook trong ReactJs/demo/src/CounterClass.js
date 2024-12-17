import React from 'react';

class CounterClass extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              count:0
          };
      }
      increment = () => {
          this.setState({count: this.state.count + 1});
      }
      decrement = () => {
          this.setState({count: this.state.count > 0 ? this.state.count - 1 : alert("Counter cannot go below 0")});
      }
      render() {
          return (
              <div>
                  <p>Count: {this.state.count}</p>
                  <button onClick={this.increment}>Increment</button>
                  <button onClick={this.decrement}>Decrement</button>
              </div>
          );
      }
}
export default CounterClass;