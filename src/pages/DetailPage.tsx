import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Ctx } from "../DataContext";
import fetchGetAllAssociatedBpmn from "../hook/fetch/Bpmn/fetchGetAllAssociatedBpmn";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import TableColumn from "../components/DataGrid/TableColumn";
import { BPMN_ASSCOIATED } from "../commons/constants";
import DetailBox from "../components/Commons/DetailBox";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";

const DetailPage = () => {

	const { abortController } = useContext(Ctx);
	const { bpmnId, modelVersion } = useParams();
	const [tableListBpmnAssociated, setTableListBpmnAssociated] = useState<any>([]);
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN_ASSCOIATED);
	const [columnVisibilityModel, _setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(visibleColumns(BPMN_ASSCOIATED));

	const getAllAssociatedBpmn = async () => {

		const url = `/bpmn/associations/${bpmnId}/version/${modelVersion}`;

		try {
			const response = await fetchGetAllAssociatedBpmn({ abortController, url })();
			console.log("response", response);
			if (response?.success) {
				setTableListBpmnAssociated(response.valuesObj);
			} else {
				setTableListBpmnAssociated([]);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	return (<BoxPageLayout px={10}>
		<DetailBox />
		<BpmnAssociatedDataGrid
			tableList={tableListBpmnAssociated}
			columns={columns}
			columnVisibilityModel={columnVisibilityModel}
			getAllList={getAllAssociatedBpmn}
		/>
		<BpmnDetailButtons />
	</BoxPageLayout>
	);
};


export default DetailPage;
