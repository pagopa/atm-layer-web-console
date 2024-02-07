import { useEffect } from "react";
import { Box } from "@mui/material";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { CustomDataGrid } from "./CustomDataGrid";

type Props = {
	tableList: any;
	columns: Array<GridColDef<any>>;
	columnVisibilityModel: GridColumnVisibilityModel;
	getAllList: (pageIndex?: any) => void;
	setPaginationModel: React.Dispatch<React.SetStateAction<{
		page: number;
		pageSize: number;
	}>>;
	paginationModel: {
		page: number;
		pageSize: number;
	};
	totalAssociationsFound: number;
};

const BpmnAssociatedDataGrid = ({ tableList, columns, columnVisibilityModel, getAllList, setPaginationModel, paginationModel, totalAssociationsFound }: Props) => {

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
				rowCount={totalAssociationsFound}
				sortingMode="server"
				columnVisibilityModel={{ ...columnVisibilityModel }}
				paginationMode="server"
				pagination
				pageSizeOptions={[5]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllList(newPage.page)}
			/>
		</Box>
	);
};

export default BpmnAssociatedDataGrid;
