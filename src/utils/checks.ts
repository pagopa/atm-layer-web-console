/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
const checks = () => {
	const numeroIntero = /^\d+$/;
	const int1toInfinity = /^[1-9][0-9]*$/;

	const regexTestField = (field: string, regType: string) => {
		let regex;
		if (regType === "int1toInfinity") {
			regex = int1toInfinity;
		} else if (regType === "numeroIntero") {
			regex = numeroIntero;
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
		if (!filename){
			return false;
		}
		const validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
		const parts = filename.split(".");

		if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
			return false;
		}

		const [name, extension] = parts;

		for (let i = 0; i < name.length; i++) {
			if (!validCharacters.includes(name[i])) {
				return false;
			}
		}

		for (let i = 0; i < extension.length; i++) {
			const charCode = extension.charCodeAt(i);
			if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) {
				return false;
			}
		}

		return true;
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
		if (path.startsWith("/") || path.endsWith("/")) {
			return false;
		}
	
		const validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
		const parts = path.split("/");
	
		for (let part of parts) {
			if (part.length === 0) {
				return false;
			}
	
			for (let i = 0; i < part.length; i++) {
				if (!validCharacters.includes(part[i])) {
					return false;
				}
			}
		}
	
		return true;
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
