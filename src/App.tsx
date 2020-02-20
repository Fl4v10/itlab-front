import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function App() {
	return (
		<div className="App">
			<Router>
				<AppBar position="static">
					<Toolbar variant="dense">
						<Typography variant="h6" color="inherit">
							Products
						</Typography>
					</Toolbar>
				</AppBar>
				<main className="App-header">
					<AppRouter />
				</main>
			</Router>
		</div>
	);
}

export default App;
