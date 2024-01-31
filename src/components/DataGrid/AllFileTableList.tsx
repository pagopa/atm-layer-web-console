import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { CustomDataGrid } from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
};

export const AllFileTableList = ({ tableList, columns, columnVisibilityModel }: Props) => {

	const rowHeight = 55;

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
				pagination
				rowHeight={rowHeight}
				rows={tableList ?? []}
				rowCount={tableList?.length}
				sortingMode="server"
				columnVisibilityModel={{ ...columnVisibilityModel }}
				pageSizeOptions={[10]}
				// paginationModel={paginationModel}
				// onPaginationModelChange={setPaginationModel}
				paginationMode="server"
			/>
		</Box>
	);
};

export default AllFileTableList;
