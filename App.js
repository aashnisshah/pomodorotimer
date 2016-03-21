import React from 'react';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			txt: 'this is some text'
		}
	}
	update(e) {
		this.setState({
			txt: e.target.value
		})
	}

	render(){
		return (
			<div>
				<input type="txt" onChange={this.update.bind(this)} />
				<h1>{this.state.txt}</h1>
			</div>
		);
	}
}

export default App