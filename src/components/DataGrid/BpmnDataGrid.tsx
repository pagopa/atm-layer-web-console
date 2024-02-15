import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BPMN } from "../../commons/constants";
import { GET_ALL_BPMN_FILTER } from "../../commons/endpoints";
import fetchGetAllFiltered from "../../hook/fetch/fetchGetAllFiltered";
import { getQueryString } from "../../utils/Commons";
import { Ctx } from "../../DataContext";
import { CustomDataGrid } from "./CustomDataGrid";
import TableColumn from "./TableColumn";
import FilterBar from "./Filters/FilterBar";

export const BpmnDataGrid = () => {

	const initialValues = {
		functionType: "",
		fileName: "",
		modelVersion: "",
		acquirerId: "",
		status: ""
	};
	const { abortController } = useContext(Ctx);
	const [tableListBpmn, setTableListBpmn] = useState<any>([]);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN);
	const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(visibleColumns(BPMN));
	const [totalItemsFound, setTotalItemsFound] = useState(0);

	const getAllBpmnList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_BPMN_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		const url = getQueryString(URL, filterValues, BPMN);

		try {
			const response = await fetchGetAllFiltered({ abortController, url })();
			if (response?.success) {
			  const { page, limit, results, itemsFound } = response.valuesObj;
			  setTableListBpmn(results);
			  setPaginationModel({ page, pageSize: limit });
			  setTotalItemsFound(itemsFound);
			} else {
			  setTableListBpmn([]);
			}
		  } catch (error) {
			console.error("ERROR", error);
		  }
	};

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllBpmnList();
		}
	}, []);

	return (
		<Box p={2}>
			<FilterBar
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				setTableList={setTableListBpmn}
				getAllList={getAllBpmnList} 
				newFilterValues={initialValues}
				driver={BPMN}
			/>
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
				rowHeight={55}
				rows={tableListBpmn}
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
