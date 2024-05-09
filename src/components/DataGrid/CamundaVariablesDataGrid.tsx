import { SetStateAction, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { CAMUNDA_VARIABLES, CREATE_VARIABLE, DELETE_VARIABLE, UPDATE_VARIABLE } from "../../commons/constants";
import { GET_ALL_VARIABLES_FILTER } from "../../commons/endpoints";
import { getQueryString } from "../Commons/Commons";
import ModalVariable from "../FormComponents/FormsVariables/ModalVariable";
import CustomDataGrid from "./CustomDataGrid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import FilterBar from "./Filters/FilterBar";
import TableColumn from "./TableColumn";

type Props = {
	type: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenSnackBar: React.Dispatch<SetStateAction<boolean>>;
	setSeverity: React.Dispatch<React.SetStateAction<"error" | "success">>;
	setMessage: React.Dispatch<SetStateAction<string>>;
	setTitle: React.Dispatch<SetStateAction<string>>;
};

export default function CamundaVariablesDataGrid ({ type, setType, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) {

	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		name: "",
		value: ""
	};

	const emptyResponse = {page:0,limit:10,itemsFound:0,totalPages:0,results:[]};
	const { abortController} = useContext(Ctx);
	const [tableListCamundaVariables, setTableListCamundaVariables] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const columns: Array<GridColDef> = buildColumnDefs(CAMUNDA_VARIABLES);
	const [totalCamundaVariablesFound, setTotalCamundaVariablesFound] = useState(0);
	const getAllVariablesList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_VARIABLES_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, CAMUNDA_VARIABLES), method: "GET", abortController })();
			setLoadingButton(false);
			setStatusError(response?.status);
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListCamundaVariables(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalCamundaVariablesFound(itemsFound);
			} else {
				setTableListCamundaVariables([]);
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
			void getAllVariablesList();
		}
	}, []);

	const handleModalClick= () => {
		setOpen(true);
		setType(CREATE_VARIABLE);
	};

	return (
		<Box p={2}>
			<FilterBar
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				setTableList={tableListCamundaVariables}
				getAllList={getAllVariablesList}
				newFilterValues={initialValues}
				driver={CAMUNDA_VARIABLES}
				loadingButton={loadingButton}
				setLoadingButton={setLoadingButton}
				createIcon={true}
				handleClick={handleModalClick}
			/>
			<CustomDataGrid
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				autoHeight
				className="CustomDataGrid"
				columns={columns}
				getRowId={(r) => r.name}
				hideFooterSelectedRowCount={true}
				rowHeight={50}
				rows={tableListCamundaVariables}
				rowCount={totalCamundaVariablesFound}
				sortingMode="server"
				slots={{
					noRowsOverlay: () => (
						<CustomNoRowsOverlay
							message="Variabili non presenti"
							statusError={statusError}
						/>
					),
				}}
				columnVisibilityModel={visibleColumns("")}
				paginationMode="server"
				pagination
				pageSizeOptions={[10]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllVariablesList(filterValues, newPage.page)}
				loading={loading}
			/>
			<ModalVariable
				open={open}
				setOpen={setOpen}
				type={type}
				setOpenSnackBar={setOpenSnackBar}
				setSeverity={setSeverity}
				setMessage={setMessage}
				setTitle={setTitle}
			/>
		</Box>
	);
};