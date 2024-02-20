/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import { BPMN, DELETE_ASSOCIATION, RESOURCES, WORKFLOW_RESOURCE } from "../commons/constants";
import ROUTES from "../routes";

/* eslint-disable functional/immutable-data */

export const resetErrors = (errors: any, setErrors: any, field: string | number) => {
	if (field) {
		// reset errore specifico field
		if (errors[field]) {
			setErrors((prevErrors: { [x: string]: any }) => {
				delete prevErrors[field];
				return { ...prevErrors };
			});
		}
	} else {
		// reset di tutti gli errori dei field
		setErrors((prevErrors: any) => {
			let newErr: any;
			for (let e of Object.keys(prevErrors)) {
				delete newErr[e];
				newErr = { ...newErr };
			}
			return newErr;
		});
	}
};

export const getQueryString = (URL: string, filterValues: any, driver: string) => {

	let queryString = URL;

	switch (driver) {
	case BPMN:
		if (filterValues?.functionType) {
			queryString = queryString.concat(`&functionType=${filterValues.functionType.toUpperCase()}`);
		}

		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.modelVersion) {
			queryString = queryString.concat(`&modelVersion=${filterValues.modelVersion}`);
		}

		if (filterValues?.acquirerId) {
			queryString = queryString.concat(`&acquirerId=${filterValues.acquirerId}`);
		}

		if (filterValues?.status) {
			queryString = queryString.concat(`&status=${filterValues.status}`);
		}
		break;
	case RESOURCES:
		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.noDeployableResourceType) {
			queryString = queryString.concat(`&noDeployableResourceType=${filterValues.noDeployableResourceType}`);
		}
		break;
	case WORKFLOW_RESOURCE:

		if (filterValues?.resourceType) {
			queryString = queryString.concat(`&resourceType=${filterValues.resourceType}`);
		}

		if (filterValues?.fileName) {
			queryString = queryString.concat(`&fileName=${filterValues.fileName}`);
		}

		if (filterValues?.status) {
			queryString = queryString.concat(`&status=${filterValues.status}`);
		}
		break;
	case DELETE_ASSOCIATION:
		if (filterValues?.branchId) {
			queryString = queryString.concat(`&branchId=${filterValues.branchId}`);
		}

		if (filterValues?.terminalId) {
			queryString = queryString.concat(`&terminalId=${filterValues.terminalId}`);
		}
		break;
	default:
		return "";
	}

	return queryString;
};

export const handleSnackbar = (
	success: boolean,
	setMessage: React.Dispatch<React.SetStateAction<any>>,
	setSeverity: React.Dispatch<React.SetStateAction<any>>,
	setTitle: React.Dispatch<React.SetStateAction<any>>,
	setOpenSnackBar: React.Dispatch<React.SetStateAction<any>>,
	valueMessage?: string
) => {
	setSeverity(success ? "success" : "error");
	setMessage(success ? "Operazione riuscita" : valueMessage ? valueMessage : "Operazione fallita");
	setTitle(success ? "Successo" : "Errore");
	setOpenSnackBar(true);
};

export const breadCrumbLinkComponent = (arrLinks: Array<{ rootName: string; rootValue: string }>, message: string) => [
	"Home",
	...arrLinks.map((e, i) =>
		<Link
			key="link"
			href={e.rootValue}
			color="inherit"
			underline="hover"
		>
			{e.rootName}
		</Link>	
	),
	message
];

export const commonBreadRootComp = (recordParams: any) => [
	{
		rootValue: `/webconsole${ROUTES.BPMN}`,
		rootName: "Risorse di processo"
	},
	{
		rootValue: generatePath(`/webconsole${ROUTES.BPMN_DETAILS}`, { bpmnId: recordParams.bpmnId, modelVersion: recordParams.modelVersion }),
		rootName: "Dettaglio risorsa di processo"

	}
];

