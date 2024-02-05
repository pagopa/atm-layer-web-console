import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { CustomDataGrid } from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
	filterValues?: any;
	getAllBpmnList: (filterValues?: any, pageIndex?: any) => void;
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

export const BpmnDataGrid = ({ tableList, columns, columnVisibilityModel, filterValues, getAllBpmnList, setPaginationModel, paginationModel, totalItemsFound }: Props) => {

	const rowHeight = 55;

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			getAllBpmnList();
		}
		console.log("tableList.length", tableList.length);
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
				getRowId={(r) => r.bpmnId.concat(r.modelVersion)}
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
				onPaginationModelChange={(newPage) => getAllBpmnList(filterValues, newPage.page)}
			/>
		</Box>
	);
};

export default BpmnDataGrid;
