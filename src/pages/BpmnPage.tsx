import { Box, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import BpmnDataGrid from "../components/DataGrid/BpmnDataGrid";
import FilterBar from "../components/DataGrid/FilterBar";
import fetchGetAllFiltered from "../hook/fetch/fetchGetAllFiltered";
import { getQueryString } from "../utils/Commons";
import { GET_ALL_BPMN_FILTER } from "../commons/endpoints";
import { Ctx } from "../DataContext";
import { BPMN } from "../commons/constants";
import TableColumn from "../components/DataGrid/TableColumn";
import ROUTES from "../routes";
import GoBackButton from "../components/Commons/GoBackButton";
import BoxPageLayout from "./Layout/BoxPageLayout";

const BpmnPage = () => {
	const initialValues = {
		functionType: "",
		fileName: "",
		modelVersion: "",
		acquirerId: "",
		status: ""
	};
	const theme = useTheme();
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
		const url = getQueryString(GET_ALL_BPMN_FILTER, pageIndex ?? paginationModel.page, paginationModel.pageSize, filterValues, BPMN);

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

	return (
		<BoxPageLayout shadow={true} px={0} mx={5}>
			<FilterBar
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				setTableList={setTableListBpmn}
				getAllList={getAllBpmnList} 
				newFilterValues={initialValues}
				driver={BPMN}
			/>
			<BpmnDataGrid
				tableList={tableListBpmn}
				columns={columns}
				columnVisibilityModel={columnVisibilityModel}
				filterValues={filterValues}
				getAllBpmnList={getAllBpmnList}
				setPaginationModel={setPaginationModel}
				paginationModel={paginationModel}
				totalItemsFound={totalItemsFound} />
		</BoxPageLayout>
		
	);
};

export default BpmnPage;