import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { CustomDataGrid } from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
	filterValues?: any;
	getAllList: (filterValues?: any, pageIndex?: any) => void;
	setPaginationModel: React.Dispatch<React.SetStateAction<{
		page: number;
		pageSize: number;
	}>>;
	paginationModel: {
		page: number;
		pageSize: number;
	};
	totalItemsFound: number;
};

export const WorkflowResourceDataGrid = ({ tableList, columns, columnVisibilityModel, filterValues, getAllList, setPaginationModel, paginationModel, totalItemsFound }: Props) => {

	const rowHeight = 55;

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			getAllList();
		}
	}, []);

	return (
		<Box p={2}>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight={true}
				className="CustomDataGrid"
				columnBuffer={6}
				columns={columns}
				getRowId={(r) => r.workflowResourceId.concat(r.createdAt)}
				hideFooterSelectedRowCount={true}
				rowHeight={rowHeight}
				rows={tableList}
				rowCount={totalItemsFound}
				sortingMode="server"
				columnVisibilityModel={{ ...columnVisibilityModel }}
				paginationMode="server"
				pagination
				pageSizeOptions={[10]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllList(filterValues, newPage.page)}
			/>
		</Box>
	);
};

export default WorkflowResourceDataGrid;
