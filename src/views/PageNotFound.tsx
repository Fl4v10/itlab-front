import { Component } from "react";
import React from "react";
import { Paper, Typography } from "@material-ui/core";

export default class PageNotFound extends Component {
	render() {
		return (
			<Paper>
				<Typography variant="h1" component="h2" gutterBottom>
					404
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					Desculpe, essa página não foi encontrada
				</Typography>
			</Paper>
		);
	}
}
