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
		this.state = {
			startCounter: 0,
			startMessage: 'Pomodoro Time!'
		}
	}
	mount() {
		let counter = parseInt(this.state.startCounter) > 4 ? 1 : this.state.startCounter + 1
		this.setState({
			startCounter: counter,
			startMessage: (5 - counter) + ' countdowns before taking a break'
		})
		ReactDOM.render(<App />, document.getElementById('countdown'))
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('countdown'))
	}
	update(e) {
		//  hook up to global variable for time
	}
	render() {
		return (
			<div>
				<div>
					<h2>{this.state.startMessage}</h2>
				</div>
				<NumInput
						ref="red"
						min={0}
						max={255}
						step={1}
						val={5}
						type="number" // swap between slider or input field
						label="minutes"
						update={this.update} />
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

class NumInput extends React.Component {
	render() {
		let label = this.props.label !== '' ?
			<label>{this.props.label} - {this.props.val}</label> : ''
		return (
			<div>
				<input ref="inp"
					type={this.props.type}
					min={this.props.min}
					max={this.props.max}
					step={this.props.step}
					defaultValue={this.props.val}
					onChange={this.props.update} />
				{label}
			</div>
		)
	}
}

NumInput.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	step: React.PropTypes.number,
	val: React.PropTypes.number,
	label: React.PropTypes.string,
	update: React.PropTypes.func.isRequired,
	type: React.PropTypes.oneOf(['number','range'])
}

NumInput.defaultProps = {
	min: 0,
	max: 0,
	step: 1,
	val: 0,
	label: '',
	type: 'range'
}

export default Wrapper