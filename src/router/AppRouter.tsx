import { Component } from "react";
import React from "react";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "../views/PageNotFound";
import ProductView from "../views/ProductView";

export class AppRouter extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={ProductView} />
				<Route path="/index" component={ProductView} />
				<Route path="/product" component={ProductView} />
				<Route component={PageNotFound} />
			</Switch>
		);
	}
}
