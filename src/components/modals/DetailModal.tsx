import {
	createStyles,
	Divider,
	Grid,
	IconButton,
	Theme,
	WithStyles,
	withStyles,
	Box
} from "@material-ui/core";
import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme: Theme) =>
	createStyles({
		modalBody: {
			padding: theme.spacing(2),
			textAlign: "justify"
		}
	});

interface IConfirmDeleteModalProps extends WithStyles<typeof styles> {
	customBody: JSX.Element;
	onDelete: () => void;
	onEdit: () => void;
}

class ConfirmDeleteModal extends React.Component<IConfirmDeleteModalProps> {
	render() {
		const { props } = this;
		const { classes } = props;
		return (
			<div>
				<Grid container justify="center">
					<Grid item className={classes.modalBody}>
						{props.customBody}
						<Box marginTop={2}>
							<Divider light />
						</Box>
					</Grid>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<IconButton
								onClick={(_: any) => props.onEdit()}
								color={"primary"}
							>
								<EditIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton
								onClick={(_: any) => props.onDelete()}
								color={"secondary"}
							>
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(ConfirmDeleteModal);
