import { Typography, Grid, Box, IconButton } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import ActionIcon from "../Commons/ActionIcon";
import { BPMN } from "../../commons/constants";
import useColumns from "../../hook/Grids/useColumns";

const TableColumn = () => {
	
	const {getColumnsGrid, getVisibleColumns, getNavigationPaths}=useColumns();
	const buildColumnDefs=(driver:string)=>{
		const cols= getColumnsGrid(driver,showCustomHeader, renderCell, showBpmnId, actionColumn);
		return cols as Array<GridColDef > ;
	};
	const visibleColumns=(driver:string)=>getVisibleColumns(driver) ;
	const navigate = useNavigate();

	const actionColumn = (param: any) => {
		const path = getNavigationPaths(BPMN, param);
		return (
		// <Box
		// 	display="flex"
		// 	justifyContent="flex-end"
		// 	width="100%"
		// 	mr={2}
		// 	sx={{ cursor: "pointer" }}
		// >
		// 	<IconButton
		// 		onClick={() => navigate(generatePath(ROUTES.BPMN_DETAILS, { bpmnId: p.row.bpmnId, modelVersion: p.row.modelVersion }))}
		// 		sx={{
		// 			width: "100%",
		// 			"&:hover": { backgroundColor: "transparent !important" },
		// 		}}import useColumns from '../../hook/Grids/useColumns';

		// 	>
		// 		<ArrowForwardIos sx={{ color: "primary.main", fontSize: "24px" }} />
		// 	</IconButton>
		// </Box>
			<ActionIcon 
				action={() => navigate(path)} 
				icon={"ArrowForward"}		
			/>
		);
	};

	function renderCell(
		params: GridRenderCellParams,
		value: ReactNode = params.value,
	) {
		return (
			<Box
				key={`${value}`}
				sx={{
					width: "100%",
					height: "100%",
					paddingRight: "18px",
					paddingLeft: "18px",
					paddingTop: "-16px",
					paddingBottom: "-16px",
					WebkitBoxOrient: "vertical" as const,
				}}
			>
				<Box
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical" as const,
						width: "100%",
						color: params.row.status === "SUSPENDED" ? "text.disabled" : undefined,
						fontSize: "14px",
					}}
				>
					{value}
				</Box>
			</Box>
		);
	}

	function showCustomHeader(params: GridColumnHeaderParams) {
		return (
			<Typography
				color="colorTextPrimary"
				variant="body2"
				sx={{ fontWeight: "fontWeightBold", outline: "none", paddingLeft: 1, color: "#ffffff" }}
			>
				{params.colDef.headerName}
			</Typography>
		);
	};

	function showBpmnId(params: GridRenderCellParams) {
		return (
			<>
				{renderCell(
					params,
					<Grid container sx={{ width: "100%" }}>
						<Grid item xs={12} sx={{ width: "100%" }}>
							<Typography
								variant="body2"
								sx={{
								// fontWeight: "fontWeightMedium",
									overflow: "hidden",
									textOverflow: "ellipsis",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical" as const,
								}}
							>
								{params.row.bpmnId}
							</Typography>
						</Grid>
					</Grid>
				)}
			</>
		);
	};
	return {
		buildColumnDefs,
		actionColumn,
		renderCell,
		showCustomHeader,
		showBpmnId,
		visibleColumns
	};
};

export default TableColumn;