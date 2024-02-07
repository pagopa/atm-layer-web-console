import { useContext, useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { Ctx } from "../DataContext";
import fetchGetAllAssociatedBpmn from "../hook/fetch/Bpmn/fetchGetAllAssociatedBpmn";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import TableColumn from "../components/DataGrid/TableColumn";
import { BPMN_ASSOCIATED } from "../commons/constants";
import DetailBox from "../components/Commons/DetailBox";
import { GET_ALL_BPMN_ASSOCIATED } from "../commons/endpoints";
import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";
import { ActionAlert } from "../components/Commons/ActionAlert";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";

const DetailPage = () => {

	const { abortController } = useContext(Ctx);
	const [detail, setDetail] = useState({});
	const { bpmnId, modelVersion } = useParams();
	const [tableListBpmnAssociated, setTableListBpmnAssociated] = useState<any>([]);
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN_ASSOCIATED);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 5,
	});
	const [totalAssociationsFound, setTotalAssociationsFound] = useState(0);
	const [snackBarVerticalAlign, setSnackBarVerticalAlign] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const storedRecordParams = localStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);

	const getAllAssociatedBpmn = async (pageIndex?: number) => {
		const baseUrl = generatePath(GET_ALL_BPMN_ASSOCIATED, { bpmnId: bpmnId ?? "", modelVersion: modelVersion ?? "" });
		const paginatedUrl = `${baseUrl}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		try {
			const response = await fetchGetAllAssociatedBpmn({
				abortController, url: paginatedUrl
			})();
			console.log("response", response);
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
		}
	};

	return (<BoxPageLayout px={10}>
		<ActionAlert openSnackBar={false} severity={undefined} message={""} snackBarVerticalAlign={snackBarVerticalAlign}/>
		<DetailBox detail={detail} />
		<BpmnAssociatedDataGrid
			tableList={tableListBpmnAssociated}
			columns={columns}
			columnVisibilityModel={visibleColumns(BPMN_ASSOCIATED)}
			getAllList={getAllAssociatedBpmn}
			setPaginationModel={setPaginationModel}
			paginationModel={paginationModel}
			totalAssociationsFound={totalAssociationsFound}
		/>
		<BpmnDetailButtons openDialog={() => setOpen(true)}/>
		<DeployBpmn open={open} setOpen={setOpen}/>
	</BoxPageLayout>
	);
};


export default DetailPage;
