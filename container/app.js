import React, {Component} from 'react';

import Employees from '../components/Employees';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Employees />
			</div>
		);
	}
}

export default App;
