export const isValidUUID = (uuid: string) => {
	const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	return uuidRegex.test(uuid);
};

export const isValidDeployableFilename = (filename: string) => {
	const deployableFileNameRegex = /^[a-zA-Z0-9_-]+$/;
	return deployableFileNameRegex.test(filename);
};

export const isValidResourcesFilename = (filename: string) => {
	const resourcesFileNameRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
	return resourcesFileNameRegex.test(filename);
};