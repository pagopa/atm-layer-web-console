import { Box } from "@mui/material";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { Ctx } from "../DataContext";
import { BPMN, WORKFLOW_RESOURCE } from "../commons/constants";
import { GET_ALL_WORKFLOW_RESOURCES_FILTER } from "../commons/endpoints";
import GoBackButton from "../components/Commons/GoBackButton";
import FilterBar from "../components/DataGrid/FilterBar";
import TableColumn from "../components/DataGrid/TableColumn";
import fetchGetAllWfResourcesFiltered from "../hook/fetch/WorkflowResource/fetchGetAllWfResourcesFiltered";
import ROUTES from "../routes";
import { getQueryString } from "../utils/Commons";
import WorkflowResourceDataGrid from "../components/DataGrid/WorkflowResourceDataGrid";
import BoxPageLayout from "./Layout/BoxPageLayout";

const WorkflowResourcePage = () => {
	const initialValues = {
		resourceType: "",
		filename: "",
		status: ""
	};

	const { abortController } = useContext(Ctx);
	const [tableListWfResources, setTableListWfResources] = useState<any>([]);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(WORKFLOW_RESOURCE);
	const [totalItemsFound, setTotalItemsFound] = useState(0);


	const getAllWfResourcesList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const url = getQueryString(GET_ALL_WORKFLOW_RESOURCES_FILTER, pageIndex ?? paginationModel.page, paginationModel.pageSize, filterValues, WORKFLOW_RESOURCE);

		try {
			const response = await fetchGetAllWfResourcesFiltered({ abortController, url })();
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListWfResources(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalItemsFound(itemsFound);
			} else {
				setTableListWfResources([]);
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
				setTableList={tableListWfResources}
				getAllList={getAllWfResourcesList}
				newFilterValues={initialValues}
				driver={WORKFLOW_RESOURCE}
			/>
			<WorkflowResourceDataGrid
				tableList={tableListWfResources}
				columns={columns}
				columnVisibilityModel={visibleColumns(WORKFLOW_RESOURCE)}
				filterValues={filterValues}
				getAllList={getAllWfResourcesList}
				setPaginationModel={setPaginationModel}
				paginationModel={paginationModel}
				totalItemsFound={totalItemsFound}
			/>
		</BoxPageLayout>
	);
};


export default WorkflowResourcePage;