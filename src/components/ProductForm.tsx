import {
	Button,
	CircularProgress,
	createStyles,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	InputAdornment,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	TextField,
	Theme,
	WithStyles,
	withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import React from "react";
import { EProductType, ProductViewModel } from "../repositories/productApi";

const styles = (theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(4, 3)
		},
		grid: {
			display: "grid"
		},
		button: {
			margin: theme.spacing(1)
		},
		select: {
			marginTop: theme.spacing(2)
		},
		container: {
			marginTop: theme.spacing(2)
		},
		textField: {
			margin: theme.spacing(1),
			width: "90%"
		}
	});

interface IProductRegisterState {
	targetGender?: boolean;
}

interface IProductRegisterProps extends WithStyles<typeof styles> {
	product: ProductViewModel;
	isLoading: boolean;
	handleChange: (value: any, key: keyof ProductViewModel) => void;
	onSubmit: () => void;
}

class ProductRegister extends React.Component<
	IProductRegisterProps,
	IProductRegisterState
> {
	state = {
		targetGender: false
	} as IProductRegisterState;

	constructor(props: IProductRegisterProps) {
		super(props);
		this.setState({
			targetGender: props.product.targetGender
		});
	}

	render() {
		const { props, state } = this;
		const { classes } = props;

		return (
			<Container maxWidth="md" className={classes.container}>
				<Paper className={classes.paper}>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item md={6} sm={12}>
							<TextField
								required
								id="description"
								label="Name"
								value={props.product.name}
								onChange={this.handleTextFieldChange.bind(this, "name")}
								className={classes.textField}
								margin="normal"
								inputProps={{
									maxLenght: 200
								}}
							/>
						</Grid>
						<Grid item md={6} sm={12}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Público Alvo</FormLabel>
								<RadioGroup
									aria-label="schedule"
									name="schedule"
									value={state.targetGender}
									onChange={this.handleTargetGenderChange.bind(this)}
									row
								>
									<FormControlLabel
										value={false}
										checked={!this.str2bool(state.targetGender)}
										control={<Radio />}
										label="Female"
									/>
									<FormControlLabel
										value={true}
										control={<Radio />}
										label="Male"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container direction="row" justify="center" alignItems="center">
						<Grid item md={6} sm={12}>
							<TextField
								className={classes.textField}
								id="input-value-textfield"
								label="Price"
								type="number"
								value={props.product.value}
								onChange={this.handleTextFieldChange.bind(this, "value")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">R$:</InputAdornment>
									)
								}}
								inputProps={{
									min: 1,
									max: 99999999,
									maxLenght: 9
								}}
								onInput={(e: any) => {
									e.target.value = Math.max(0, parseInt(e.target.value, 10))
										.toString()
										.slice(0, 9);

									if (e.target.value > 99999999) {
										e.target.value = 99999999;
									}
								}}
							/>
						</Grid>
						<Grid item md={6} sm={12}>
							<Select
								id="type_team"
								value={props.product.type}
								label="Category"
								onChange={(
									event: React.ChangeEvent<{ name?: string; value: unknown }>,
									_: any
								) => props.handleChange(event.target.value, "type")}
								className={classes.select}
								style={{ width: "100%" }}
							>
								{Object.keys(EProductType).map((key: string, i) => (
									<MenuItem value={i}>{EProductType[key]}</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<Grid className={classes.grid}>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							onClick={() => this.props.onSubmit()}
							className={classes.button}
							id="submit_product"
						>
							{this.props.isLoading ? (
								<CircularProgress size={25} style={{ color: green[50] }} />
							) : (
								"Cadastrar"
							)}
						</Button>
					</Grid>
				</Paper>
			</Container>
		);
	}

	private handleTextFieldChange(
		key: keyof ProductViewModel,
		event: React.ChangeEvent<HTMLInputElement>
	) {
		const value = event.target.value;
		this.props.handleChange(value, key);
	}

	private handleTargetGenderChange(
		event: React.ChangeEvent<HTMLInputElement>,
		_: string
	) {
		const value = event.target.value;
		this.setState({ targetGender: this.str2bool(value) });
		this.props.handleChange(value, "targetGender");
	}

	str2bool(value) {
		if (value && typeof value === "string") {
			if (value.toLowerCase() === "true") return true;
			if (value.toLowerCase() === "false") return false;
		}
		return value;
	}
}

export default withStyles(styles)(ProductRegister);
