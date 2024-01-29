import { Typography, Grid, Box, IconButton } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactNode } from "react";
import { ArrowForwardIos } from "@mui/icons-material";

export function buildColumnDefs() {
	return [
		{
			field: "functionType",
			cellClassName: "justifyContentNormal",
			headerName: "Tipo funzione",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.functionType),
			sortable: false,
			flex: 3,
		},
		{
			field: "deployedFileName",
			cellClassName: "justifyContentNormal",
			headerName: "Nome file",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.deployedFileName),
			sortable: false,
			flex: 3,
		},
		{
			field: "status",
			cellClassName: "justifyContentNormal",
			headerName: "Stato",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.status),
			sortable: false,
			flex: 3,
		},
		{
			field: "modelVersion",
			cellClassName: "justifyContentNormal",
			headerName: "Versione",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.modelVersion),
			sortable: false,
			flex: 3,
		},
		{
			field: "createdAt",
			cellClassName: "justifyContentNormal",
			headerName: "Data creazione",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.createdAt),
			sortable: false,
			flex: 3,
		},
		{
			field: "lastUpdatedAt",
			cellClassName: "justifyContentNormal",
			headerName: "Data ultima modifica",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.lastUpdatedAt),
			sortable: false,
			flex: 3,
		},
		{
			field: "bpmnId",
			cellClassName: "justifyContentBold",
			headerName: "bpmnId",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params: any) => showBpmnId(params),
			sortable: false,
			flex: 4,
		},
		{
			field: "enabled",
			cellClassName: "justifyContentNormal",
			headerName: "enabled",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.enabled),
			sortable: false,
			flex: 3,
			initialVisibilityModel: false
		},
		{
			field: "deployment_id",
			cellClassName: "justifyContentNormal",
			headerName: "deployment_id",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.deployment_id),
			sortable: false,
			flex: 3,
			initialVisibilityModel: false
		},
		{
			field: "definition_key",
			cellClassName: "justifyContentNormal",
			headerName: "definition_key",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.definition_key),
			sortable: false,
			flex: 3,
			initialVisibilityModel: false
		},
		{
			field: "description",
			cellClassName: "justifyContentNormal",
			headerName: "description",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.description),
			sortable: false,
			flex: 3,
		},
		{
			field: "resource",
			cellClassName: "justifyContentNormal",
			headerName: "resource",
			align: "left",
			headerAlign: "left",
			editable: false,
			disableColumnMenu: true,
			renderHeader: showCustomHeader,
			renderCell: (params) => renderCell(params, params.row.resourceFile.resource),
			sortable: false,
			flex: 3,
		},
		{
			field: "actions",
			cellClassName: "justifyContentNormalRight",
			headerName: "",
			align: "right",
			hideSortIcons: true,
			disableColumnMenu: true,
			editable: false,
			renderCell: (p) => (
				<Box
					display="flex"
					justifyContent="flex-end"
					width="100%"
					mr={2}
					sx={{ cursor: "pointer" }}
				>
					<IconButton
						onClick={() => console.log("clicked!")}
						data-testid={`open-${p.row.iban}`}
						sx={{
							width: "100%",
							"&:hover": { backgroundColor: "transparent !important" },
						}}
					>
						<ArrowForwardIos sx={{ color: "primary.main", fontSize: "24px" }} />
					</IconButton>
				</Box>
			),
			sortable: false,
			flex: 1,
		},
	] as Array<GridColDef>;
}

export function renderCell(
	params: GridRenderCellParams,
	value: ReactNode = params.value,
) {
	return (
		<Box
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

export function showCustomHeader(params: GridColumnHeaderParams) {
	return (
		<Typography
			color="colorTextPrimary"
			variant="body2"
			sx={{ fontWeight: "fontWeightBold", outline: "none", paddingLeft: 1, color: "#ffffff" }}
		>
			{params.colDef.headerName}
		</Typography>
	);
}

export function showBpmnId(params: GridRenderCellParams) {
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
}
