import { generatePath } from "react-router";
import Link from "@mui/material/Link";
import ROUTES from "../../routes";

export const breadCrumbLinkComponent = (message: string) => {
	const recordParams = JSON.parse(localStorage.getItem("recordParams") ?? "");
	const hrefValue = generatePath(`/webconsole/${ROUTES.BPMN_DETAILS}`, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion });
	
	return [
		"Home",
		"Risorse di processo",
		<Link
			key="link"
			href={hrefValue}
			color="inherit"
			underline="always"
		>
            Dettaglio risorsa di processo
		</Link>,
		message
	];
};