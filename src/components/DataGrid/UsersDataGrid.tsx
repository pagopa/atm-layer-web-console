import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { CREATE_USER, USERS } from "../../commons/constants";
import { GET_ALL_USERS } from "../../commons/endpoints";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { getQueryString } from "../Commons/Commons";
import ModalUsers from "../FormComponents/FormUsers/ModalUsers";
import CustomDataGrid from "./CustomDataGrid";
import TableColumn from "./TableColumn";
import FilterBar from "./Filters/FilterBar";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";

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


export default function UsersDataGrid({ type, setType, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle } : Props) {

	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);
	
	const initialValues = {
		userId: "",
		profileIds: "",
	};

	const emptyResponse = {page:0,limit:10,itemsFound:0,totalPages:0,results:[]};
	const { abortController } = useContext(Ctx);
	const [tableListUsers, setTableListUsers] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const columns: Array<GridColDef> = buildColumnDefs(USERS);
	const [totalItemsFound, setTotalItemsFound] = useState(0);

	const getAllUsersList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_USERS}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, USERS), method: "GET", abortController })();
			setLoadingButton(false);
			setStatusError(response?.status);

			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListUsers(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalItemsFound(itemsFound);
			} else {
				setTableListUsers(emptyResponse);
			}
		} catch (error) {
			setLoadingButton(false);
			console.error("ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	const handleModalClick= () => {
		setOpen(true);
		setType(CREATE_USER);
	};

	useEffect(() => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			void getAllUsersList();
		}
	}, []);

	return (
		<Box p={2}>
			<Box mb={1}>
				<FilterBar
					filterValues={filterValues}
					setFilterValues={setFilterValues}
					setTableList={setTableListUsers}
					getAllList={getAllUsersList}
					newFilterValues={initialValues}
					driver={USERS}
					loadingButton={loadingButton}
					setLoadingButton={setLoadingButton}
					createIcon={true}
					handleClick={handleModalClick}
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
					getRowId={(r) => r.userId}
					hideFooterSelectedRowCount={true}
					rowHeight={50}
					rows={tableListUsers}
					rowCount={totalItemsFound}
					slots={{
						noRowsOverlay: () => (
							<CustomNoRowsOverlay
								message="Utenti non presenti"
								statusError={statusError}
							/>
						),
					}}
					sortingMode="server"
					columnVisibilityModel={visibleColumns(USERS)}
					paginationMode="server"
					pagination
					pageSizeOptions={[10]}
					paginationModel={{ ...paginationModel }}
					onPaginationModelChange={(newPage) => getAllUsersList(filterValues, newPage.page)}
					loading={loading}
				/>
				<ModalUsers
					open={open}
					setOpen={setOpen}
					type={type}
					setOpenSnackBar={setOpenSnackBar}
					setSeverity={setSeverity}
					setMessage={setMessage}
					setTitle={setTitle}
				/>
			</Box>
		</Box>
	);
};
