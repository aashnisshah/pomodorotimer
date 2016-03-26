import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			val: 3
		}
		this.update = this.update.bind(this);
	}
	update() {
		this.setState({val: this.state.val - 1})
		if (this.state.val <= 0) {
			clearInterval(this.inc)
			console.log('timer done')
		}
	}
	componentWillMount() {
		// when component is fully prepped and ready to enter the DOM
		// this.setState({m: 2})
	}
	render() {
		console.log('rendering')
		if(this.state.val <= 0) {
			return <h1>Timer is finished</h1>
		} else {
			return <button onClick={this.update}>{this.state.val}</button>
		}
	}
	componentDidMount() {
		// after component exists in the DOM
		console.log(ReactDOM.findDOMNode(this))
		// calls this.update every 0.5 seconds
		this.inc = setInterval(this.update, 1000)
	}
	componentWillUnmount() {
		console.log('bye!')
		clearInterval(this.inc)
	}
}

class Wrapper extends React.Component {
	constructor() {
		super();
	}
	mount() {
		ReactDOM.render(<App />, document.getElementById('a'))
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	render() {
		return (
			<div>
				<button onClick={this.mount.bind(this)}>Start</button>
				<button onClick={this.unmount.bind(this)}>Reset</button>
				<div id="a"></div>
			</div>
		)
	}
}

export default Wrapper