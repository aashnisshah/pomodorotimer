import React from 'react';

// one way to display content
// class component - can have a state
class App extends React.Component {
  render(){
  	// using HTML/JSX: 
    return (
    	<div>
    		<h1>Hello World</h1>
    		<b>This is me</b>
    	</div>
    );
    // using React native
    // return React.createElement('h1', null, 'Hello World')
  }
}

// stateless component with no state
// const App = () => <h1>Hello World</h1>

export default App