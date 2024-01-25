import { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import fetchGetAllFiltered from "../../hook/fetch/fetchGetAllFiltered";
import { Ctx } from "../../DataContext";
import { CustomDataGrid } from "./CustomDataGrid";
import { buildColumnDefs } from "./TableColumn";

export const AllFileTableList = () => {
	const [tableList, setTableList] = useState<any>([]);
	const { abortController } = useContext(Ctx);
	const pageIndex = 0;
	const pageSize = 10;

	const rowHeight = 64;

	const columns: Array<GridColDef> = buildColumnDefs();

	useEffect(() => {

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
		<Box sx={{ maxWidth: "100%" }}>
			<Grid container>
				<Grid item xs={12}>
					{(<CustomDataGrid
						disableColumnFilter
						disableColumnSelector
						disableDensitySelector
						disableRowSelectionOnClick
						autoHeight={true}
						className="CustomDataGrid"
						// columnBuffer={6}
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
					)
					}
				</Grid>
			</Grid>
		</Box>
	);
};

export default AllFileTableList;
