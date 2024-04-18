import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import formatValues from "../../utils/formatValues";
import DetailStaticResources from "../../components/Detail/DetailStaticResources";


const ResourcesDetailPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isStatic:true}, false), "Dettaglio risorsa statica");
	const { formatDateToString, extractExtension, extractRelativeCdnPath } = formatValues();
	const fields = [
		{ label: "Tipo risorsa", value: "noDeployableResourceType" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
		{ label: "Estensione file", value: "cdnUrl", format: extractExtension},
		{ label: "Percorso file", value: "storageKey", format: extractRelativeCdnPath}
	];
	const detailTitle = "Dettaglio risorsa statica";

	return (
		<DetailStaticResources
			detailFields={fields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
		/>
	);
};

export default ResourcesDetailPage;