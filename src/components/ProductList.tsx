import { CircularProgress, Container } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import {
	createStyles,
	lighten,
	makeStyles,
	Theme
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import React from "react";
import { ProductViewModel } from "../repositories/productApi";
import moment from "moment";
export enum EProductType {
	_House = "House",
	_Car = "Car",
	_Animal = "Animal"
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

type Order = "asc" | "desc";

function getSorting<K extends keyof ProductViewModel>(
	order: Order,
	orderBy: K
): (a: ProductViewModel, b: ProductViewModel) => any {
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

interface headCell {
	disablePadding: boolean;
	id?: keyof ProductViewModel;
	label: string;
	numeric: boolean;
}

const headCells: headCell[] = [
	{ id: "name", numeric: false, disablePadding: true, label: "Name" },
	{ id: "value", numeric: false, disablePadding: false, label: "Price" },
	{
		id: "targetGender",
		numeric: false,
		disablePadding: false,
		label: "Target Gender"
	},
	{
		id: "registerAt",
		numeric: false,
		disablePadding: false,
		label: "Register At"
	},
	{ id: undefined, numeric: false, disablePadding: false, label: "Editar" }
];

interface EnhancedTableProps {
	classes: ReturnType<typeof useStyles>;
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property?: keyof ProductViewModel
	) => void;
	onSelectAllClick: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props;
	const createSortHandler = (property?: keyof ProductViewModel) => (
		event: React.MouseEvent<unknown>
	) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "default"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={order}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

const useToolbarStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(1)
		},
		highlight:
			theme.palette.type === "light"
				? {
						color: theme.palette.secondary.main,
						backgroundColor: lighten(theme.palette.secondary.light, 0.85)
				  }
				: {
						color: theme.palette.text.primary,
						backgroundColor: theme.palette.secondary.dark
				  },
		title: {
			flex: "1 1 100%"
		}
	})
);

interface EnhancedTableToolbarProps {
	numSelected: number;
	onDelete: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
				>
					{numSelected} selecionado(s)
				</Typography>
			) : (
				<Typography
					align="left"
					className={classes.title}
					variant="h6"
					id="tableTitle"
				>
					Usuários
				</Typography>
			)}
			{numSelected > 0 ? (
				<Container>
					<Tooltip title="Delete">
						<IconButton
							aria-label="delete"
							onClick={(_: any) => props.onDelete()}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Container>
			) : null}
		</Toolbar>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			marginTop: theme.spacing(3)
		},
		paper: {
			width: "100%",
			marginBottom: theme.spacing(2)
		},
		table: {
			minWidth: 750
		},
		tableWrapper: {
			overflowX: "auto"
		},
		visuallyHidden: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: 1,
			margin: -1,
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			top: 20,
			width: 1
		}
	})
);

interface IProductListProps {
	loading: boolean;
	onEdit: (id: number) => void;
	onDelete: (ids: number[]) => void;
	list: ProductViewModel[];
}

export default function EnhancedTable(props: IProductListProps) {
	const classes = useStyles();
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof ProductViewModel>("name");
	const [selected, setSelected] = React.useState<number[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (_: any, property?: keyof ProductViewModel) => {
		if (property) {
			const isDesc = orderBy === property && order === "desc";
			setOrder(isDesc ? "asc" : "desc");
			setOrderBy(property);
		}
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = props.list.map(n => n.id!);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, props.list.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					onDelete={() => {
						props.onDelete(selected);
						setSelected([]);
					}}
				/>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
						aria-label="enhanced table"
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={props.list.length}
						/>
						<TableBody>
							{props.loading ? (
								<CircularProgress color="secondary" />
							) : props.list.length > 0 ? (
								stableSort<ProductViewModel>(
									props.list,
									getSorting(order as any, orderBy as any)
								)
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.id!);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.id}
												selected={isItemSelected}
											>
												<TableCell
													padding="checkbox"
													onClick={(event: any) => handleClick(event, row.id!)}
												>
													<Checkbox
														checked={isItemSelected}
														inputProps={{ "aria-labelledby": labelId }}
													/>
												</TableCell>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="none"
													onClick={(event: any) => handleClick(event, row.id!)}
													style={{ cursor: "pointer" }}
												>
													{row.name}
												</TableCell>
												<TableCell align="left">{`R$:${row.value}`}</TableCell>
												<TableCell align="left">
													{targetGenderLabel(row.targetGender)}
												</TableCell>
												<TableCell align="left">
													{moment(row.registerAt!).format("DD/MM/YYYY HH:mm")}
												</TableCell>
												<TableCell align="left">
													<Tooltip title="Editar">
														<IconButton
															aria-label="alter"
															onClick={(_: any) => props.onEdit(row.id!)}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										);
									})
							) : (
								<Typography variant="subtitle2">
									Nada por aqui ainda!
								</Typography>
							)}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={props.list.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						"aria-label": "previous page"
					}}
					nextIconButtonProps={{
						"aria-label": "next page"
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}

function targetGenderLabel(type: any): React.ReactNode {
	if (type) {
		return "Male";
	} else {
		return "Famale";
	}
}

function getEnumLabels(key?: EProductType) {
	var s = EProductType;
	debugger;
	const aaa = s[1];
	return s[key!];
}
