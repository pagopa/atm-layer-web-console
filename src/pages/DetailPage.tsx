import { useContext, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { Ctx } from "../DataContext";
import fetchGetAllAssociatedBpmn from "../hook/fetch/Bpmn/fetchGetAllAssociatedBpmn";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import TableColumn from "../components/DataGrid/TableColumn";
import { BPMN_ASSOCIATED } from "../commons/constants";
import DetailBox from "../components/Commons/DetailBox";
import { GET_ALL_BPMN_ASSOCIATED } from "../commons/endpoints";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";

const DetailPage = () => {

	const { abortController } = useContext(Ctx);
	const { bpmnId, modelVersion } = useParams();
	const [tableListBpmnAssociated, setTableListBpmnAssociated] = useState<any>([]);
	const { buildColumnDefs, visibleColumns } = TableColumn();
	const columns: Array<GridColDef> = buildColumnDefs(BPMN_ASSOCIATED);
	const [columnVisibilityModel, _setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(visibleColumns(BPMN_ASSOCIATED));

	const getAllAssociatedBpmn = async () => {

		try {
			const response = await fetchGetAllAssociatedBpmn({ abortController, url: generatePath(GET_ALL_BPMN_ASSOCIATED, { bpmnId: bpmnId ?? "", modelVersion: modelVersion ?? "" }) })();
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
