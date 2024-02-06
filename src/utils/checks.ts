/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
const checks = () => {
	const alphaNumeric = /^[a-z0-9 ]+$/i; 
	const regFloat0to100 = /^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/;
	const regInt1to50 = /^[1-4][0-9]?$|^50$|^5$/;
	const regFloat0_01to99_99 = /^(?!0{1,2}\.0(?![1-9]))\d{1,2}(?:\.\d{1,2})?$/;
	const regInt1to100 = /^[1-9][0-9]?$|^100$/;
	const int1to99 = /^[1-9][0-9]?$/;
	
	const stringWithoutSpaces = /^[^\s]*$/; // verifica la presenza di spazi all'interno della stringa
	const stringNotEmptyNotSpaces = /^[^\s]+$/; // verifica se la stringa è composta da almeno un carattere e che non contenga spazi
	const oreMinuti =
		/^((?!(00:00)$)(([0-1]?[0-9]|2[0-3]):[0-5][0-9])|24:00)$/; /* /^(([0-1]?[0-9]|2[0-3]):[0-5][0-9])|24:00$/; */

	const numeroIntero = /^\d+$/;
	const numeDecimaleConSeparatore = /^(-)?\d{1,3}(\.?\d{3})*(,\d{2})?$/; // numero con , per parte decimale (2 cifre) e . per separatore migliaia

	const date_aaaammgg = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
	const regexTestField = (field: string, regType: string) => {
		let regex;
		switch (regType) {
		
		case "int1to50":
			regex = regInt1to50;
			break;
		case "regFloat0_01to99_99":
			regex = regFloat0_01to99_99;
			break;
		case "regFloat0to100":
			regex = regFloat0to100;
			break;
		case "alphaNumeric":
			regex = alphaNumeric;
			break;

		case "int1to100":
			regex = regInt1to100;
			break;
		case "int1to99":
			regex = int1to99;
			break;
		
		case "stringWithoutSpaces":
			regex = stringWithoutSpaces;
			break;
		case "stringNotEmptyNotSpaces":
			regex = stringNotEmptyNotSpaces;
			break;
		case "oreMinuti":
			regex = oreMinuti;
			break;

		case "numeroIntero":
			regex = numeroIntero;
			break;
		case "numeDecimaleConSeparatore":
			regex = numeDecimaleConSeparatore;
			break;
		case "date_aaaammgg":
			regex = date_aaaammgg;
			break;
		default:
			break;
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


	return {
		checkIsEmptyString,
		isObjectEmpty,
		copyObject,
		regexTestField,
		isInvalidField,
		isValidNumber,
		copyArrayObject
	};
};

export default checks;
