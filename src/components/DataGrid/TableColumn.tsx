import { Typography, Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CSSProperties, ReactNode } from "react";
import { DELETE_ASSOCIATION, DELETE_BANK, UPDATE_BANK } from "../../commons/constants";
import useColumns from "../../hook/Grids/useColumns";


const TableColumn = (setOpen?: any, setType?: any) => {

	const { getColumnsGrid, getVisibleColumns, getNavigationPaths } = useColumns();
	const buildColumnDefs = (driver: string) => {
		const cols = getColumnsGrid(driver, showCustomHeader, renderCell, actionColumn, deleteColumn, deleteColumnBank, editColumnBank);
		return cols as Array<GridColDef>;
	};
	const visibleColumns = (driver: string) => getVisibleColumns(driver);
	const navigate = useNavigate();
	const theme = useTheme();

	function showCustomHeader(params: GridColumnHeaderParams, overrideStyle: CSSProperties = {}) {
		return (
			<Typography
				color={theme.palette.primary.contrastText}
				variant="body2"
				sx={{
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical" as const,
					whiteSpace: "normal"
				}}
			>
				{params.colDef.headerName}
			</Typography>
		);
	};

	function renderCell(
		params: any,
		value: ReactNode = params.value,
		overrideStyle: CSSProperties = {}
	) {
		return (
			<Box
				px={1.5}
				width="100%"
				height="100%"
				sx={{
					WebkitBoxOrient: "vertical" as const,
					...overrideStyle,
				}}
			>
				<Box
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical" as const,
						width: "100%"
					}}
				>
					<Tooltip
						placement="bottom-start"
						title={<span> {value}</span>}
					>
						<Typography variant="body1">
							{value}
						</Typography>
					</Tooltip>
				</Box>
			</Box>
		);
	}

	const actionColumn = (param: any, dataType: string) => {
		const path = getNavigationPaths(dataType, param);
		return (
			<Box
				display="flex"
				justifyContent="flex-end"
				width="30%"
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={() => {
						navigate(path);
						sessionStorage.setItem("recordParams", JSON.stringify(param.row));
					}}
					sx={{
						width: "100%",
						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="action-column-test"
				>
					<ArrowForwardIos sx={{ color: "primary.main", fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	const deleteColumn = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(DELETE_ASSOCIATION);
			sessionStorage.setItem("recordParamsAssociated", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="delete-column-test"
				>
					<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	const deleteColumnBank = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(DELETE_BANK);
			sessionStorage.setItem("recordParamsBank", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="delete-column-test"
				>
					<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	const editColumnBank = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(UPDATE_BANK);
			sessionStorage.setItem("recordParamsBank", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="edit-column-test"
				>
					<EditIcon sx={{ color: theme.palette.primary.main, fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};


	return {
		buildColumnDefs,
		actionColumn,
		renderCell,
		showCustomHeader,
		visibleColumns,
		deleteColumn,
		deleteColumnBank,
		editColumnBank
	};
};

export default TableColumn;