import { useContext, useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Ctx } from "../../DataContext";
import { RESOURCES } from "../../commons/constants";
import { GET_ALL_RESOURCES_FILTER } from "../../commons/endpoints";
import { getQueryString } from "../Commons/Commons";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import TableColumn from "./TableColumn";
import FilterBar from "./Filters/FilterBar";
import CustomDataGrid from "./CustomDataGrid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";


export const ResourcesDataGrid = () => {

	const [loading, setLoading] = useState(true);

	const initialValues = {
		noDeployableResourceType: "",
		fileName: ""
	};

	const { abortController } = useContext(Ctx);
	const [tableListResources, setTableListResources] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(RESOURCES);
	const [totalItemsFound, setTotalItemsFound] = useState(0);

	const getAllResourcesList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_RESOURCES_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, RESOURCES), method: "GET", abortController })();
			setLoading(false);
			setStatusError(response?.status);
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListResources(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalItemsFound(itemsFound);
			} else {
				setTableListResources([]);
			}
		} catch (error) {
			setLoading(false);
			console.error("ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllResourcesList();
		}
	}, []);

	return (
		<Box p={2}>
			<FilterBar
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				setTableList={setTableListResources}
				getAllList={getAllResourcesList}
				newFilterValues={initialValues}
				driver={RESOURCES}
				loading={loading}
				setLoading={setLoading}
			/>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight
				className="CustomDataGrid"
				columns={columns}
				getRowId={(r) => r.resourceId}
				hideFooterSelectedRowCount={true}
				rowHeight={50}
				rows={tableListResources}
				rowCount={totalItemsFound}
				sortingMode="server"
				slots={{
					noRowsOverlay: () => (
						<CustomNoRowsOverlay
							message="Risorse statiche non presenti"
							statusError={statusError}
						/>
					),
				}}
				columnVisibilityModel={visibleColumns(RESOURCES)}
				paginationMode="server"
				pagination
				pageSizeOptions={[10]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllResourcesList(filterValues, newPage.page)}
				loading={loading}
			/>
		</Box>
	);
};

export default ResourcesDataGrid;