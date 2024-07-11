import { SetStateAction, useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { getQueryString } from "../Commons/Commons";
import { BANKS, CREATE_BANK } from "../../commons/constants";
import { GET_ALL_BANKS_FILTER } from "../../commons/endpoints";
import ModalBank from "../FormComponents/FormsBank/ModalBank";
import CustomDataGrid from "./CustomDataGrid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import TableColumn from "./TableColumn";
import FilterBar from "./Filters/FilterBar";

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

export default function BankDataGrid ({ type, setType, open, setOpen, setOpenSnackBar, setSeverity, setMessage, setTitle }: Props) {

	const [loading, setLoading] = useState(true);
	const [loadingButton, setLoadingButton] = useState(false);

	const initialValues = {
		acquirerId: "",
		denomination: "",
		clientId: "",
		rateMax: "",
		rateMin: ""
	};

	const emptyResponse = {page:0,limit:10,itemsFound:0,totalPages:0,results:[]};
	const { abortController} = useContext(Ctx);
	const [tableListBanks, setTableListBanks] = useState<any>([]);
	const [statusError, setStatusError] = useState(0);
	const [filterValues, setFilterValues] = useState(initialValues);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const columns: Array<GridColDef> = buildColumnDefs(BANKS);
	const [totalBanksFound, setTotalBanksFound] = useState(0);
	const getAllBanksList = async (filterValues?: any, pageIndex?: number): Promise<void> => {
		const URL = `${GET_ALL_BANKS_FILTER}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;

		try {
			const response = await fetchRequest({ urlEndpoint: URL, queryString: getQueryString(filterValues, BANKS), method: "GET", abortController })();
			setLoadingButton(false);
			setStatusError(response?.status);
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListBanks(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalBanksFound(itemsFound);
			} else {
				setTableListBanks(emptyResponse);
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
			void getAllBanksList();
		}
	}, []);

	const handleModalClick= () => {
		setOpen(true);
		setType(CREATE_BANK);
	};

	return (
		<Box p={2}>
			<Box mt={-2}>
				<FilterBar
					filterValues={filterValues}
					setFilterValues={setFilterValues}
					setTableList={tableListBanks}
					getAllList={getAllBanksList}
					newFilterValues={initialValues}
					driver={BANKS}
					loadingButton={loadingButton}
					setLoadingButton={setLoadingButton}
					createIcon={true}
					handleClick={handleModalClick}
				/>
			</Box>
			<Box mt={2}>
				<CustomDataGrid
					disableColumnFilter
					disableColumnSelector
					disableDensitySelector
					disableRowSelectionOnClick
					autoHeight
					className="CustomDataGrid"
					columns={columns}
					getRowId={(r) => r.acquirerId}
					hideFooterSelectedRowCount={true}
					rowHeight={50}
					rows={tableListBanks}
					rowCount={totalBanksFound}
					sortingMode="server"
					slots={{
						noRowsOverlay: () => (
							<CustomNoRowsOverlay
								message="Banche non presenti non presenti"
								statusError={statusError}
							/>
						),
					}}
					columnVisibilityModel={visibleColumns(BANKS)}
					paginationMode="server"
					pagination
					pageSizeOptions={[10]}
					paginationModel={{ ...paginationModel }}
					onPaginationModelChange={(newPage) => getAllBanksList(filterValues, newPage.page)}
					loading={loading}
				/>
			</Box>
			<ModalBank
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