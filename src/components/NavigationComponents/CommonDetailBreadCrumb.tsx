import { generatePath } from "react-router";
import Link from "@mui/material/Link";
import ROUTES from "../../routes";

export const breadCrumbLinkComponent = (currentPage: string) => {
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const hrefValue = generatePath(`/webconsole/${ROUTES.BPMN_DETAILS}`, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
	
	return [
		"Home",
		"Risorse di processo",
		<Link
			key="link"
			href={hrefValue}
			color="inherit"
			underline="hover"
		>
            Dettaglio risorsa di processo
		</Link>,
		currentPage
	];
};