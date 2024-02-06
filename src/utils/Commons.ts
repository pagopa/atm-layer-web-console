/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */

import { BPMN, WORKFLOW_RESOURCE } from "../commons/constants";

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

export const getQueryString = (URL: string, pageIndex: number|string, pageSize: number|string, filter: any, driver: string) => {
	let queryString = `${URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

	switch(driver) {
	case BPMN: 
		if(filter?.functionType) {
			queryString = queryString.concat(`&functionType=${filter.functionType.toUpperCase()}`);
		}
		
		if(filter?.fileName) {
			queryString = queryString.concat(`&fileName=${filter.fileName}`);
		}
		
		if(filter?.modelVersion) {
			queryString = queryString.concat(`&modelVersion=${filter.modelVersion}`);
		}
		
		if(filter?.acquirerId) {
			queryString = queryString.concat(`&acquirerId=${filter.acquirerId}`);
		}
		
		if(filter?.status) {
			queryString = queryString.concat(`&status=${filter.status}`);
		}
		break;
	case WORKFLOW_RESOURCE:
		if(filter?.deployedFileName) {
			queryString = queryString.concat(`&deployedFileName=${filter.deployedFileName}`);
		}
		
		if(filter?.status) {
			queryString = queryString.concat(`&status=${filter.status}`);
		}
		break;
	default:
		return "";
	}
	
	return queryString;
};