import { Box, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import BpmnDataGrid from "../components/DataGrid/BpmnDataGrid";
import FilterBar from "../components/DataGrid/Filter";
import fetchGetAllFiltered from "../hook/fetch/fetchGetAllFiltered";
import { getQueryString } from "../utils/Commons";
import { GET_ALL_BPMN_FILTER } from "../commons/endpoints";
import { Ctx } from "../DataContext";
import { BPMN } from "../commons/constants";
import TableColumn from "../components/DataGrid/TableColumn";
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
		pageIndex: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN);
	const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(visibleColumns(BPMN));


	const getAllBpmnList = async (filterValues?: any): Promise<void> => {
		const url = getQueryString(GET_ALL_BPMN_FILTER, paginationModel.pageIndex, paginationModel.pageSize, filterValues);

		try {
			const response = await fetchGetAllFiltered({ abortController, url })();
			if (response?.success) {
				setTableListBpmn(response.valuesObj.results);
			} else {
				setTableListBpmn([]);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	return (
		<BoxPageLayout shadow={true} px={0} mx={5}>
			<FilterBar filterValues={filterValues} setFilterValues={setFilterValues} setTableList={setTableListBpmn} getAllBpmnList={getAllBpmnList} />
			<BpmnDataGrid tableList={tableListBpmn} columns={columns} columnVisibilityModel={columnVisibilityModel} filterValues={filterValues} getAllBpmnList={getAllBpmnList} />
		</BoxPageLayout>
	);
};

export default BpmnPage;