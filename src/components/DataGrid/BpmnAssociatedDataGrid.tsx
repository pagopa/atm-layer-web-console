import { useEffect } from "react";
import { Box } from "@mui/material";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { CustomDataGrid } from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
	getAllList: ( pageIndex?: any) => void;
};

const BpmnAssociatedDataGrid = ({ tableList, columns, columnVisibilityModel, getAllList}: Props) => {

	useEffect(() => {
		getAllList();
	}, []);

	return (
		<Box mt={2}>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight={true}
				className="CustomDataGrid"
				columnBuffer={6}
				columns={columns}
				getRowId={(r) => r.bpmnId.concat(r.createdAt)}
				hideFooterSelectedRowCount={true}
				rowHeight={55}
				rows={tableList}
				rowCount={tableList.length}
				sortingMode="server"
				columnVisibilityModel={{ ...columnVisibilityModel }}
				paginationMode="server"
				pagination
				pageSizeOptions={[10]}
				// paginationModel={{ ...paginationModel }}
				// onPaginationModelChange={(newPage) => getAllBpmnList(filterValues, newPage.page)}
			/>
		</Box>
	);
};

export default BpmnAssociatedDataGrid;
