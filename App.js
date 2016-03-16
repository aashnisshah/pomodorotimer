import React from 'react';
import ReactDOM from 'react-dom';

// one way to display content
// class component - can have a state
class App extends React.Component {
	render(){
		let txt = this.props.txt
		return <h1>{txt}</h1>
	}
}

App.propTypes = {
	txt: React.PropTypes.string,
	cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
	txt: 'Header Text'
}

ReactDOM.render(
	<App cat={5} txt="Hello World" />,
	document.getElementById('app')
);