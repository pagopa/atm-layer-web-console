/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */

import { BPMN, DELETE_ASSOCIATION, WORKFLOW_RESOURCE } from "../commons/constants";

/* eslint-disable functional/immutable-data */
export const isValidUUID = (uuid: string) => {
	const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidRegex.test(uuid);
};

export const isValidDeployableFilename = (filename: string) => {
	const deployableFileNameRegex = /^[a-zA-Z0-9_-]+$/;
	return deployableFileNameRegex.test(filename);
};

export const deployableFilename = (filename: string) => {
	const fileNameIndex = filename.split("/").lastIndexOf("/");
	const splittedFileName = filename.split("/");
	if (isValidDeployableFilename(filename)) {
		return splittedFileName[fileNameIndex];
	}
};

export const isValidResourcesFilename = (filename: string) => {
	const resourcesFileNameRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
	return resourcesFileNameRegex.test(filename);
};

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

export const handleSnackbar = (success: boolean,
	setMessage: React.Dispatch<React.SetStateAction<any>>,
	setSeverity: React.Dispatch<React.SetStateAction<any>>,
	setTitle: React.Dispatch<React.SetStateAction<any>>,
	setOpenSnackBar: React.Dispatch<React.SetStateAction<any>>) => {
	if (success) {
		setMessage("Operazione riuscita");
		setSeverity("success");
		setTitle("Successo");
	} else {
		setMessage("Operazione fallita");
		setSeverity("error");
		setTitle("Errore");
	}
	setOpenSnackBar(true);
};