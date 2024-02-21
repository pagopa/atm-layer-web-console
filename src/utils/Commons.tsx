/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
import { Link } from "@mui/material";
import { generatePath } from "react-router-dom";
import { BPMN, DELETE_ASSOCIATION, RESOURCES, WORKFLOW_RESOURCE } from "../commons/constants";
import ROUTES from "../routes";
import { LinkModelDto, PageDto } from "../model/LinkModel";


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
	setMessage(success ? "" : valueMessage ? valueMessage : "Operazione fallita");
	setTitle(success ? "Successo" : "Errore");
	setOpenSnackBar(true);
};

export const breadCrumbLinkComponent = (arrLinks: Array<LinkModelDto>, message: string) => [
	// "Home",
	...arrLinks.map((e, i) =>
		<Link
			key="link"
			href={process.env.REACT_APP_HOME_PATH+ e.rootValue}
			color="inherit"
			underline="hover"
		>
			{e.rootName}
		</Link>	
	),
	message
];

export const commonBreadRoot = (currentPage:PageDto, isDetail:boolean=false, recordParams?: any ) => {
	let links=[
		{
			rootValue: ROUTES.HOME,
			rootName: "Home"
		}		
	];
	if(currentPage?.isBpmn){
		links.push(
			{
				rootValue: ROUTES.BPMN,
				rootName: "Risorse di processo"
			}
		);
	}
	if(currentPage?.isBpmn && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.BPMN_DETAILS, { bpmnId: recordParams?.bpmnId, modelVersion: recordParams?.modelVersion }),
			rootName: "Dettaglio risorsa di processo"

		});
	}
	if(currentPage?.isStatic){
		links.push(
			{
				rootValue: ROUTES.RESOURCES,
				rootName: "Risorse statiche"
			}
		);
	}
	if(currentPage?.isStatic && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.RESOURCES_DETAILS, { resourceId: recordParams?.resourceId }),
			rootName: "Dettaglio risorsa statica"

		});
	}
	if(currentPage?.isWR){
		links.push(
			{
				rootValue: ROUTES.WORKFLOW_RESOURCES,
				rootName: "Risorse aggiuntive per processi"
			}
		);
	}
	if(currentPage?.isWR && isDetail){
		links.push({
			rootValue: generatePath(ROUTES.WORKFLOW_RESOURCE_DETAILS, { workflowResourceId: recordParams?.workflowResourceId }),
			rootName: "Dettaglio risorsa aggiuntiva per processo"

		});
	}
	return links;
};
