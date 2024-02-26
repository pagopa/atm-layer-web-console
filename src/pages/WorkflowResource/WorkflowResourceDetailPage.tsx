import formatValues from "../../utils/formatValues";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import DetailWr from "../../components/Commons/DetailWr";

const WorkflowResourceDetailPage = () => {

	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isWR:true}, false), "Dettaglio risorsa aggiuntiva per processo");
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
		<DetailWr
			detailFields={fields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
		/>
	);
};


export default WorkflowResourceDetailPage;