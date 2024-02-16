import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useEffect } from "react";
import CustomDataGrid from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
	filterValues?: any;
	getAllBpmnList: (filterValues?: any) => void;
};

export const AllFileTableList = ({ tableList, columns, columnVisibilityModel, filterValues, getAllBpmnList}: Props) => {

	const rowHeight = 55;

	useEffect(() => {
		if(!Object.values(filterValues).some(value => value !== "")) {
			getAllBpmnList();
		}
	},[]);

	return (
		<Box p={2}>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight={true}
				className="CustomDataGrid"
				columns={columns}
				getRowId={(r) => r.bpmnId.concat(r.modelVersion)}
				hideFooterSelectedRowCount={true}
				pagination
				rowHeight={rowHeight}
				rows={tableList ?? []}
				rowCount={tableList?.length}
				sortingMode="server"
				columnVisibilityModel={{ ...columnVisibilityModel }}
				pageSizeOptions={[100]}
				paginationMode="server"
			/>
		</Box>
	);
};

export default AllFileTableList;
