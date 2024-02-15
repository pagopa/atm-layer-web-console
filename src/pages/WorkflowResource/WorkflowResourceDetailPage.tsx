import formatValues from "../../utils/formatValues";
import DetailPage from "../../components/Commons/DetailPage";
import { WORKFLOW_RESOURCE } from "../../commons/constants";

const WorkflowResourceDetailPage = () => {

	const breadComponent = [ "Home", "Risorse aggiuntive per processi", "Dettaglio risorsa aggiuntiva per processo"];
	const { formatDateToString } = formatValues();
	const fields = [
		{ label: "Tipo risorsa", value: "resourceS3Type" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Stato", value: "status" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
	];
	const detailTitle = "Dettaglio risorsa aggiuntiva per processo";

	return (
		<DetailPage 
			detailFields={fields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
			detailButtonsComponentType={WORKFLOW_RESOURCE}
		/>
	);
};


export default WorkflowResourceDetailPage;