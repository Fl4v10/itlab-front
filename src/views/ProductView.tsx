import {
	AppBar,
	createStyles,
	Dialog,
	Fab,
	IconButton,
	Theme,
	Toolbar,
	Typography,
	WithStyles,
	withStyles,
	Paper
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import React from "react";
import { ProductViewModel } from "../repositories/productApi";
import ProductService from "../services/ProductService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const styles = (theme: Theme) =>
	createStyles({
		appBar: {
			position: "relative"
		},
		fab: {
			display: "flex",
			margin: theme.spacing(2, 3)
		},
		extendedIcon: {
			marginRight: theme.spacing(1)
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1
		}
	});

interface IProductViewState {
	open: boolean;
	products: ProductViewModel[];
	current: ProductViewModel;
	isLoading: boolean;
}

interface IProductViewProps extends WithStyles<typeof styles> {
	date: Date;
	handleChange: (value: any, key: keyof ProductViewModel) => void;
}

class ProductView extends React.Component<
	IProductViewProps,
	IProductViewState
> {
	state = {
		open: false,
		current: new ProductViewModel(),
		products: [] as ProductViewModel[],
		isLoading: true,
		date: moment(this.props.date)
	} as IProductViewState;

	private service = new ProductService();

	constructor(props: IProductViewProps) {
		super(props);
		this.loadList();
	}

	render() {
		const { props, state } = this;
		const { classes } = props;

		const handleClose = () => {
			this.setState({ open: !this.state.open });
		};

		return (
			<Container maxWidth="md">
				<Fab
					size="small"
					variant="extended"
					color="secondary"
					aria-label="add"
					className={classes.fab}
					onClick={() => {
						this.setState({
							current: new ProductViewModel(),
							open: !this.state.open
						});
					}}
				>
					<AddIcon className={classes.extendedIcon} /> Register Product&nbsp;
				</Fab>
				<Paper>
					<ProductList
						loading={state.isLoading}
						onEdit={this.loadFormData.bind(this)}
						list={state.products}
						onDelete={this.deleteSelected.bind(this)}
					/>
				</Paper>
				<Dialog fullScreen open={state.open} onClose={handleClose}>
					<AppBar className={classes.appBar}>
						<Toolbar style={{ backgroundColor: "#282c34" }}>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleClose}
								aria-label="close"
							>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Products
							</Typography>
						</Toolbar>
					</AppBar>
					<ProductForm
						isLoading={this.state.isLoading}
						product={this.state.current!}
						onSubmit={this.onSubmit.bind(this)}
						handleChange={this.handleChange}
					/>
				</Dialog>
			</Container>
		);
	}

	handleChange = (value: any, key: keyof ProductViewModel) => {
		const current = this.state.current;
		//@ts-ignore
		current[key] = value;
		this.setState({ current });
	};

	private deleteSelected = (ids: number[]) => {
		this.service.deleteProduct(ids).then(_ => {
			this.loadList();
		});
	};

	private async loadList() {
		let products = await this.service.getProducts("");
		if (!products) {
			products = [] as ProductViewModel[];
		}
		this.setState({ products, isLoading: false });
	}

	private loadFormData = (id: number) => {
		const current =
			this.state.products.find(f => f.id === id) || new ProductViewModel();
		this.setState({ current, open: true });
	};

	private onSubmit = () => {
		const current = this.state.current!;
		this.service
			.saveProduct(
				new ProductViewModel({
					id: current.id,
					name: current.name,
					value: current.value,
					targetGender: current.targetGender,
					type: current!.type
				})
			)
			.then(_ => {
				this.setState({ isLoading: true, open: false });
				this.loadList();
			})
			.catch(err => {
				alert("Erro ao cadastrar o produto. Tente novamente mais tarde.");
				this.setState({ isLoading: false, open: false });
			});
	};
}

export default withStyles(styles)(ProductView);
