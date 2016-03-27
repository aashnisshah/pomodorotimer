import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			val: 300,
			min: 5,
			sec: '00'
		}
		this.update = this.update.bind(this);
	}
	update() {
		this.setState({
			val: this.state.val - 1,
			min: Math.floor(this.state.val / 60),
			sec: ('0' + this.state.val % 60).slice(-2)	
		})
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
			var divStyle = {
				'borderRadius': '50%',
				border: '3px solid #d9534f',
				'backgroundColor': 'pink',
				padding: '20vh',
				'fontSize': '10em'
			};
			return (
				<div className="btn-group" style={divStyle}>
					{this.state.min}:{this.state.sec}
				</div>

				// <button onClick={this.update}>{this.state.val}</button>
			)
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
		ReactDOM.render(<App />, document.getElementById('countdown'))
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('countdown'))
		ReactDOM.render(<App />, document.getElementById('countdown'))
	}
	render() {
		return (
			<div>
				<div className="btn-group">
					<button
						onClick={this.mount.bind(this)}
						type="button"
						className="btn btn-success"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
					Start
					</button>
				</div>

				<div className="btn-group">
					<button
						onClick={this.unmount.bind(this)}
						type="button"
						className="btn btn-danger"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false">
					Reset
					</button>
				</div>
				<div id="countdown"></div>
			</div>
		)
	}
}

export default Wrapper