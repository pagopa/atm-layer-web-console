import { useContext, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Ctx } from "../../DataContext";
import { BPMN } from "../../commons/constants";
import fetchGetAllFiltered from "../../hook/fetch/fetchGetAllFiltered";
import { CustomDataGrid } from "./CustomDataGrid";
import FilterBar from "./Filter";
import TableColumn from "./TableColumn";

export const AllFileTableList = () => {

	const [tableList, setTableList] = useState<any>([]);
	const {buildColumnDefs, visibleColumns}=TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN);
	const [columnVisibilityModel] = useState<GridColumnVisibilityModel>(visibleColumns(BPMN));

	const initialValues = {
		functionType: "",
		fileName: "",
		modelVersion: "",
		acquirerId: "",
		status: ""
	};

	const [filterValues, setFilterValues] = useState(initialValues);

	// useEffect(()=>{
	// 	console.log("vis", columnVisibilityModel);
	// },[columnVisibilityModel]);

	const { abortController } = useContext(Ctx);
	const rowHeight = 55;
	const theme=useTheme();

	const getAllBpmn = new Promise((resolve) => {
		void fetchGetAllFiltered({ abortController, pageIndex: 0, pageSize: 10 })()
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
		<Box sx={{boxShadow: theme.shadows[4]}}>
			<FilterBar filterValues={filterValues} setFilterValues={setFilterValues} setTableList={setTableList}/>
			
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight={true}
				className="CustomDataGrid"
				columnBuffer={6}
				columns={columns}
				getRowId={(r) => new Date(r.createdAt).getTime()}
				hideFooterSelectedRowCount={true}
				pagination
				rowHeight={rowHeight}
				rows={tableList ?? []}
				rowCount={tableList?.length}
				sortingMode="client"
				pageSizeOptions={[]}
				columnVisibilityModel={{...columnVisibilityModel}}
			/>
			
		</Box>
	);
};

export default AllFileTableList;
