import { useContext, useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useParams, generatePath } from "react-router-dom";
import { Ctx } from "../../DataContext";
import { BPMN_ASSOCIATED } from "../../commons/constants";
import { GET_ALL_BPMN_ASSOCIATED } from "../../commons/endpoints";
import BoxPageLayout from "../../pages/Layout/BoxPageLayout";
import fetchGetAllAssociatedBpmn from "../../hook/fetch/Bpmn/fetchGetAllAssociatedBpmn";
import CustomDataGrid from "./CustomDataGrid";


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
		const paginatedUrl = `${baseUrl}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		try {
			const response = await fetchGetAllAssociatedBpmn({ abortController, url: paginatedUrl }) ();
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListBpmnAssociated(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalAssociationsFound(itemsFound);
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
				paginationMode="server"
				pagination
				pageSizeOptions={[5]}
				paginationModel={{ ...paginationModel }}
				onPaginationModelChange={(newPage) => getAllAssociatedBpmn(newPage.page)}
				loading={loading}
			/>
		</BoxPageLayout>
	);
};

export default BpmnAssociatedDataGrid;
