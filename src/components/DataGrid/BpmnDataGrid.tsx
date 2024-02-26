import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PROCESS_RESOURCES } from "../../commons/constants";
import { GET_ALL_BPMN_FILTER } from "../../commons/endpoints";
import { getQueryString } from "../Commons/Commons";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import CustomDataGrid from "./CustomDataGrid";
import TableColumn from "./TableColumn";
import FilterBar from "./Filters/FilterBar";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

export default function BpmnDataGrid() {

	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	

	const initialValues = {
		functionType: "",
		fileName: "",
		modelVersion: "",
		acquirerId: "",
		status: ""
	};

	const emptyResponse = {page:0,limit:10,itemsFound:0,totalPages:0,results:[]};
	const { abortController } = useContext(Ctx);
	const [tableListBpmn, setTableListBpmn] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(PROCESS_RESOURCES);
	const [totalItemsFound, setTotalItemsFound] = useState(0);

	const getAllBpmnList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_BPMN_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, PROCESS_RESOURCES), method: "GET", abortController })();
			setButtonLoading(false);
			setStatusError(response?.status);

			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListBpmn(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalItemsFound(itemsFound);
			} else {
				setTableListBpmn(emptyResponse);
			}
		} catch (error) {
			setButtonLoading(false);
			console.error("ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllBpmnList();
		}
	}, []);

	return (
		<Box p={2}>
			<Box mb={1}>
				<FilterBar
					filterValues={filterValues}
					setFilterValues={setFilterValues}
					setTableList={setTableListBpmn}
					getAllList={getAllBpmnList}
					newFilterValues={initialValues}
					driver={PROCESS_RESOURCES}
					loading={buttonLoading}
					setLoading={setButtonLoading}
				/>
			</Box>
			<Box mt={2}>
				<CustomDataGrid
					autoHeight
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					disableRowSelectionOnClick
					className="CustomDataGrid"
					columns={columns}
					getRowId={(r) => r.bpmnId.concat(r.modelVersion)}
					hideFooterSelectedRowCount={true}
					rowHeight={50}
					rows={tableListBpmn}
					rowCount={totalItemsFound}
					slots={{
						noRowsOverlay: () => (
							<CustomNoRowsOverlay
								message="Risorse di processo non presenti"
								statusError={statusError}
							/>
						),
					}}
					sortingMode="server"
					columnVisibilityModel={visibleColumns(PROCESS_RESOURCES)}
					paginationMode="server"
					pagination
					pageSizeOptions={[10]}
					paginationModel={{ ...paginationModel }}
					onPaginationModelChange={(newPage) => getAllBpmnList(filterValues, newPage.page)}
					loading={loading}
				/>
			</Box>
		</Box>
	);
};
