import { BPMN } from "../../commons/constants";
import BpmnDetailButtons from "../../components/Commons/BpmnDetailButtons";
import DetailPage from "../../components/Commons/DetailPage";
import formatValues from "../../utils/formatValues";

const BpmnDetailPage = () => {

	const { formatDateToString } = formatValues();
	const breadComponent = [ "Home", "Risorse di processo", "Dettaglio risorsa di processo"];
	const fields = [
		{ label: "Tipo Funzione", value: "functionType" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Stato", value: "status" },
		{ label: "Versione", value: "modelVersion" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
	];

	return (
		<DetailPage 
			detailFields={fields}
			detailTitle={"Dettaglio risorsa di processo"}
			breadComponent={breadComponent}
			detailButtonsComponentType={BPMN}
			bpmnAssociateTable={true}/>
	);
};


export default BpmnDetailPage;
