/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
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

export const getQueryString = (URL: string, pageIndex: number|string, pageSize: number|string) => 
	`${URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`;