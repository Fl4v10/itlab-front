import React from "react";
import {
	WithStyles,
	withStyles,
	Grid,
	Typography,
	Divider,
	Button,
	Theme,
	createStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
	createStyles({
		modalBody: {
			padding: theme.spacing(3)
		}
	});

interface IConfirmModalProps extends WithStyles<typeof styles> {
	text: string;
	confirm: (b: boolean) => void;
}

class ConfirmModal extends React.Component<IConfirmModalProps> {
	render() {
		const { props } = this;
		const { classes } = props;
		return (
			<div>
				<Grid container justify="center">
					<Grid item className={classes.modalBody}>
						<Typography variant="h6">{props.text}</Typography>
						<Divider light />
					</Grid>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						spacing={2}
					>
						<Grid item>
							<Button
								onClick={(_: any) => props.confirm(true)}
								color={"secondary"}
							>
								Confirmar
							</Button>
						</Grid>
						<Grid item>
							<Button
								onClick={(_: any) => props.confirm(false)}
								color={"primary"}
							>
								Cancelar
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(ConfirmModal);
