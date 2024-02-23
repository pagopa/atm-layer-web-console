import { useContext, useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useParams, generatePath } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { BPMN_ASSOCIATED } from "../../commons/constants";
import { GET_ALL_BPMN_ASSOCIATED } from "../../commons/endpoints";
import BoxPageLayout from "../../pages/Layout/BoxPageLayout";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import CustomDataGrid from "./CustomDataGrid";
import { CustomNoRowsOverlay } from "./NoRows";


type Props = {
	buildColumnDefs: (driver: string) => Array<GridColDef>;
	visibleColumns: (driver: string) => any;
};

const BpmnAssociatedDataGrid = ({ buildColumnDefs, visibleColumns }: Props) => {

	const [loading, setLoading] = useState(true);

	const { abortController} = useContext(Ctx);
	const { bpmnId, modelVersion } = useParams();
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 5,
	});
	const [totalAssociationsFound, setTotalAssociationsFound] = useState(0);
	
	const [tableListBpmnAssociated, setTableListBpmnAssociated] = useState<any>([]);

	const getAllAssociatedBpmn = async (pageIndex?: number) => {
		const baseUrl = generatePath(GET_ALL_BPMN_ASSOCIATED, { bpmnId: bpmnId ?? "", modelVersion: modelVersion ?? "" });
		const paginatedUrl = `?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		try {
			const response = await fetchRequest({ urlEndpoint: baseUrl, queryString: paginatedUrl, method: "GET", abortController })();

			if (response?.success) {
				const { page, totalPages } = response.valuesObj;
				setTableListBpmnAssociated(response?.valuesObj?.results);
				setPaginationModel({ page, pageSize: response?.valuesObj?.limit });
				setTotalAssociationsFound(response?.valuesObj?.itemsFound);
			} else {
				setTableListBpmnAssociated([]);
			}
		} catch (error) {
			console.error("ERROR", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		void getAllAssociatedBpmn(paginationModel.page);
	}, []);

	return (
		<BoxPageLayout shadow={true} px={0} mx={4}>
			<CustomDataGrid
				autoHeight
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				disableRowSelectionOnClick
				className="CustomDataGrid"
				columns={buildColumnDefs(BPMN_ASSOCIATED)}
				getRowId={(r) => r.bpmnId.concat(r.createdAt)}
				hideFooterSelectedRowCount={true}
				rowHeight={55}
				rows={tableListBpmnAssociated}
				rowCount={totalAssociationsFound}
				sortingMode="server"
				columnVisibilityModel={visibleColumns(BPMN_ASSOCIATED)}
				slots={{ noRowsOverlay: CustomNoRowsOverlay }}
				paginationMode="server"
				pagination
				pageSizeOptions={[5]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllAssociatedBpmn(newPage.page)}
				loading={loading}
				sx={{ "--DataGrid-overlayHeight": "250px" }} 
			/>
		</BoxPageLayout>
	);
};

export default BpmnAssociatedDataGrid;
