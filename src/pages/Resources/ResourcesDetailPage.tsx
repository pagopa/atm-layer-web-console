import { RESOURCES } from "../../commons/constants";
import DetailPage from "../../components/Commons/DetailPage";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../utils/Commons";
import formatValues from "../../utils/formatValues";


const ResourcesDetailPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isStatic:true}, false), "Dettaglio risorsa statica");
	const { formatDateToString } = formatValues();
	const fields = [
		{ label: "Tipo risorsa", value: "noDeployableResourceType" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
	];
	const detailTitle = "Dettaglio risorsa statica";

	return (
		<DetailPage
			detailFields={fields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
			detailButtonsComponentType={RESOURCES}
		/>
	);
};

export default ResourcesDetailPage;