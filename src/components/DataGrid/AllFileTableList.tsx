import { useContext, useEffect, useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import fetchGetAllFiltered from "../../hook/fetch/fetchGetAllFiltered";
import { Ctx } from "../../DataContext";
import { CustomDataGrid } from "./CustomDataGrid";
import { buildColumnDefs } from "./TableColumn";

export const AllFileTableList = () => {
	const [tableList, setTableList] = useState<any>([]);
	const columns = buildColumnDefs();
	const { abortController } = useContext(Ctx);
	const pageIndex = 0;
	const pageSize = 10;
	const rowHeight = 55;

	const getAllBpmn = new Promise((resolve) => {
		void fetchGetAllFiltered({ abortController, pageIndex, pageSize })()
			.then((response: any) => {
				if (response?.success) {
					resolve({
						data: response.valuesObj,
						type: "SUCCESS"
					});
				} else {
					resolve({
						type: "ERROR"
					});
				}
			})
			.catch((err) => {
				console.log("ERROR", err);
			});
	});

	useEffect(() => {
		getAllBpmn
			.then((res: any) => {
				console.log("GET ALL BPMN RESPONSE", res);
				setTableList(res.data);
			})
			.catch((err) => {
				console.log("GET ALL BPMN ERROR", err);
				setTableList([]);
			});
	}, []);

	return (
		<Grid container padding={8}>
			<Grid item xs={12}>
				<CustomDataGrid
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					disableRowSelectionOnClick
					autoHeight={true}
					className="CustomDataGrid"
					columnBuffer={6}
					columns={columns}
					getRowId={(r) => r.bpmnId}
					hideFooterSelectedRowCount={true}
					pagination
					rowHeight={rowHeight}
					rows={tableList ?? []}
					rowCount={tableList?.length ?? 0}
					sortingMode="client"
					pageSizeOptions={[]}
				/>
			</Grid>
		</Grid>
	);
};

export default AllFileTableList;
