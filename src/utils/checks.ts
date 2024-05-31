/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
const checks = () => {
	const int1toInfinity = /^[1-9][0-9]*$/;

	const regexTestField = (field: string, regType: string) => {
		let regex;
		if (regType === "int1toInfinity") {
			regex = int1toInfinity;
		}
		return regex?.test(field);
	};

	const checkIsEmptyString = (v: string) => v && v.trim() !== "" ? false : true;

	const isObjectEmpty = (oggetto:any) => {
		let result;
		if (oggetto && Object.keys(oggetto).length !== 0) {
			result = false;
		} else {
			result = true;
		}
		return result;
	};

	const copyObject = (oggetto:any) => 
		// funzione che prende in input un oggetto e ne fa ritorna una copia senza riferimento
		 oggetto ? JSON.parse(JSON.stringify(oggetto)) : null
	;

	const copyArrayObject = (array:Array<any>) => {
		let arr = [...array];
		let tmp: Array<any> = [];
		arr.forEach((el) => {
			let tempObj = {};
			tmp.push({ ...tempObj, ...el });
		});
		return tmp;
	};


	const isInvalidField = (field: string | number | null | undefined) => (
		field === undefined ||
			field === null ||
			(typeof field === "string" && !field.trim()) ||
			(typeof field === "number" && field < 0)
	);


	const isValidNumber=(number: string)=>{
		if(isInvalidField(number)) {return false;}
		return regexTestField(number, "numeroIntero");
	};

	const isValidResourcesFilename = (filename: string) => {
		const resourcesFileNameRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z]+$/;
		return resourcesFileNameRegex.test(filename);
	};

	const isValidDeployableFilename = (filename: string) => {
		const deployableFileNameRegex = /^[a-zA-Z0-9_-]+$/;
		return deployableFileNameRegex.test(filename);
	};
	
	const deployableFilename = (filename: string) => {
		const fileNameIndex = filename.split("/").lastIndexOf("/");
		const splittedFileName = filename.split("/");
		if (isValidDeployableFilename(filename)) {
			return splittedFileName[fileNameIndex];
		}
	};

	const isValidPath = (path: string) => {
		const pathRegex = /^(?!\/)([a-zA-Z0-9]+\/)*[a-zA-Z0-9]+(?<!\/)$/;
		return pathRegex.test(path);
	};


	return {
		checkIsEmptyString,
		isObjectEmpty,
		copyObject,
		regexTestField,
		isInvalidField,
		isValidNumber,
		copyArrayObject,
		isValidResourcesFilename,
		isValidDeployableFilename,
		deployableFilename,
		isValidPath
	};
};

export default checks;
