import { Typography, Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import { CSSProperties, ReactNode } from "react";
import { DELETE_ASSOCIATION } from "../../commons/constants";
import useColumns from "../../hook/Grids/useColumns";


const TableColumn = (setOpen?: any, setType?: any) => {

	const { getColumnsGrid, getVisibleColumns, getNavigationPaths } = useColumns();
	const buildColumnDefs = (driver: string) => {
		const cols = getColumnsGrid(driver, showCustomHeader, renderCell, actionColumn, deleteColumn);
		return cols as Array<GridColDef>;
	};
	const visibleColumns = (driver: string) => getVisibleColumns(driver);
	const navigate = useNavigate();
	const theme = useTheme();

	function showCustomHeader(params: GridColumnHeaderParams) {
		return (
			<Typography
				color={theme.palette.primary.contrastText}
				variant="body2"
			>
				{params.colDef.headerName}
			</Typography>
		);
	};

	function renderCell(
		params: GridRenderCellParams,
		value: ReactNode = params.value,
		overrideStyle: CSSProperties = {}
	) {
		return (
			<Box
				px={1.5}
				width= "100%"
				height= "100%"
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
						localStorage.setItem("recordParams", JSON.stringify(param.row));
					}}
					sx={{
						width: "100%",
						"&:hover": { backgroundColor: "transparent !important" },
					}}
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
			localStorage.setItem("recordParamsAssociated", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{
						width: "100%",
						"&:hover": { backgroundColor: "transparent !important" },
					}}
				>
					<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
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
		deleteColumn
	};
};

export default TableColumn;