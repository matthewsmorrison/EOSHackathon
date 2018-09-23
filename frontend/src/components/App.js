import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import templates
import { Home } from '../templates/Home';
import { _404 } from '../templates/Errors';
import { Header } from '../templates/Header';
import { Footer } from '../templates/Footer';

// import components
import { Share } from './Share';
import { Grant } from './Grant';
import { Request } from './Request';


export class App extends React.Component {
	render() {
		return (
			<div>
				<Header />

				{/* TODO: refactor below in Main component */}
				<Switch>
					<Route exact path="/" component={Home} />

					<Route path="/share">
						<Share/>
					</Route>

					<Route path="/grant">
						<Grant/>
					</Route>

					<Route path="/request">
						<Request/>
					</Route>

					{/* default route: page not found */}
					<Route component={_404} />
				</Switch>

				<Footer />
			</div>
		);
	}
}
