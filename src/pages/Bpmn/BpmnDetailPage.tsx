import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import formatValues from "../../utils/formatValues";
import DetailBpmn from "../../components/Commons/DetailBpmn";

const BpmnDetailPage = () => {

	const { formatDateToString } = formatValues();
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:true}, false), "Dettaglio risorsa di processo");
	const fields = [
		{ label: "Tipo Funzione", value: "functionType" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Stato", value: "status" },
		{ label: "Versione", value: "modelVersion" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
	];

	return (
		<DetailBpmn 
			detailFields={fields}
			detailTitle={"Dettaglio risorsa di processo"}
			breadComponent={breadComponent}
			bpmnAssociateTable={true}
		/>
	);
};


export default BpmnDetailPage;
