import React from "react";
import {
	Theme,
	Modal,
	Paper,
	WithStyles,
	createStyles,
	withStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(3),
			outline: "none"
		},
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}
	});

interface ICustomModalProps extends WithStyles<typeof styles> {
	body: JSX.Element;
	open: boolean;
	handleClose: () => void;
}

class CustomModal extends React.Component<ICustomModalProps> {
	render() {
		const { props } = this;
		const { classes } = props;

		return (
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={props.open}
				onClose={props.handleClose}
				className={classes.modal}
			>
				<Paper className={classes.paper}>{props.body}</Paper>
			</Modal>
		);
	}
}

export default withStyles(styles)(CustomModal);
