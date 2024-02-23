import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Ctx } from "../../DataContext";
import { WORKFLOW_RESOURCE } from "../../commons/constants";
import { GET_ALL_WORKFLOW_RESOURCES_FILTER } from "../../commons/endpoints";
import { getQueryString } from "../Commons/Commons";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import CustomDataGrid from "./CustomDataGrid";
import FilterBar from "./Filters/FilterBar";
import TableColumn from "./TableColumn";
import { CustomNoRowsOverlay } from "./NoRows";

export const WorkflowResourceDataGrid = () => {

	const [loading, setLoading] = useState(true);

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
		const URL = `${GET_ALL_WORKFLOW_RESOURCES_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		
		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString:getQueryString(filterValues, WORKFLOW_RESOURCE),  method: "GET", abortController })();

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
		} finally {
			setLoading(false);
		}
	};
	

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllWfResourcesList();
		}
	}, []);

	return (
		<Box p={2}>
			<FilterBar
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				setTableList={tableListWfResources}
				getAllList={getAllWfResourcesList}
				newFilterValues={initialValues}
				driver={WORKFLOW_RESOURCE}
			/>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight
				className="CustomDataGrid"
				columns={columns}
				getRowId={(r) => r.workflowResourceId.concat(r.createdAt)}
				hideFooterSelectedRowCount={true}
				rowHeight={50}
				rows={tableListWfResources}
				rowCount={totalItemsFound}
				sortingMode="server"
				columnVisibilityModel={visibleColumns(WORKFLOW_RESOURCE)}
				slots={{ noRowsOverlay: CustomNoRowsOverlay }}
				paginationMode="server"
				pagination
				pageSizeOptions={[10]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllWfResourcesList(filterValues, newPage.page)}
				loading={loading}
				sx={{ "--DataGrid-overlayHeight": "250px" }} 
			/>
		</Box>
	);
};

export default WorkflowResourceDataGrid;
