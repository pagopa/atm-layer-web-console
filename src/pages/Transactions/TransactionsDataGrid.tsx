import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PROCESS_RESOURCES, TRANSACTIONS } from "../../commons/constants";
import { GET_ALL_BPMN_FILTER, GET_ALL_TRANSACTIONS } from "../../commons/endpoints";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import TableColumn from "../../components/DataGrid/TableColumn";
import { getQueryString } from "../../components/Commons/Commons";
import CustomDataGrid from "../../components/DataGrid/CustomDataGrid";
import { CustomNoRowsOverlay } from "../../components/DataGrid/CustomNoRowsOverlay";
import FilterBar from "../../components/DataGrid/Filters/FilterBar";

export default function BpmnDataGrid() {

	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);
	

	const initialValues = {
		transactionId: "",
		transactionStatus: "",
		functionType: "",
		acquirerId: "",
		branchId: "",
		terminalId: "",
		startTime: "",
		endTime: ""
	};

	const emptyResponse = {page:0,limit:10,itemsFound:0,totalPages:0,results:[]};
	const { abortController } = useContext(Ctx);
	const [tableListTransactions, setTableListBTransactions] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(TRANSACTIONS);
	const [totalItemsFound, setTotalItemsFound] = useState(0);

	const getAllTransactionsList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_TRANSACTIONS}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, TRANSACTIONS), method: "GET", abortController })();
			setLoadingButton(false);
			setStatusError(response?.status);

			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListBTransactions(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalItemsFound(itemsFound);
			} else {
				setTableListBTransactions(emptyResponse);
			}
		} catch (error) {
			setLoadingButton(false);
			console.error("ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllTransactionsList();
		}
	}, []);

	return (
		<Box p={2}>
			<Box mb={1}>
				<FilterBar
					filterValues={filterValues}
					setFilterValues={setFilterValues}
					setTableList={setTableListBTransactions}
					getAllList={getAllTransactionsList}
					newFilterValues={initialValues}
					driver={TRANSACTIONS}
					loadingButton={loadingButton}
					setLoadingButton={setLoadingButton}
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
					getRowId={(r) => r.transactionId}
					hideFooterSelectedRowCount={true}
					rowHeight={50}
					rows={tableListTransactions}
					rowCount={totalItemsFound}
					slots={{
						noRowsOverlay: () => (
							<CustomNoRowsOverlay
								message="Transazioni non presenti"
								statusError={statusError}
							/>
						),
					}}
					sortingMode="server"
					columnVisibilityModel={visibleColumns(TRANSACTIONS)}
					paginationMode="server"
					pagination
					pageSizeOptions={[10]}
					paginationModel={{ ...paginationModel }}
					onPaginationModelChange={(newPage) => getAllTransactionsList(filterValues, newPage.page)}
					loading={loading}
				/>
			</Box>
		</Box>
	);
};
