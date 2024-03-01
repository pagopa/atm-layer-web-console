/* eslint-disable functional/no-let */
const formatValues = () => {
	const placeholder = "-";

	const checkValue = (v: any) => v ? v : placeholder;

	const checkEmpty = (v: any) => v ? v : "";
	const formatPercent = (v: string) => v ? v + "%" : placeholder;
	const formatCurrency = (v: string) => v ? v + " €" : placeholder;
	const checkTwoValues = (v1: string, v2: string) => {
		if (v1 && v2) {return v1 + " - " + v2;}
		else if (v1) {return v1;}
		else if (v2) {return v2;}
		else {return placeholder;}
	};

	// input data format: gg-mm-aaaa
	const checkValueToLower = (v: string) => v ? v.toLowerCase() : placeholder;

	const checkValueToLowerEmpty = (v: string) => v ? v.toLowerCase() : "";

	const checkFormatDate = (v: string) => v ? v.replaceAll("-", "/") : placeholder;

	// input: 1.166,54 (string)
	// output: 1166.54 (float)
	const numToFloat = (v: any) => {
		if (v) {
			// eslint-disable-next-line functional/no-let
			let val = v.replace(".", "");
			val = val.replace(",", ".");
			val = Number.parseFloat(val);
			return val;
		} else {return placeholder;}
	};

	// input: 25-06-2006 (stringa gg-mm-aaaa)
	// output: 2006-06-25 (stringa aaaa-mm-gg) necessaria per componente devextreme
	const formatStringToDate = (v: string) => {
		if (v) {
			const d_arr = v.split("-");
			// let d = new Date(`${d_arr[2]}-${d_arr[1]}-${d_arr[0]}`);
			return `${d_arr[2]}-${d_arr[1]}-${d_arr[0]}`;
		} else {return placeholder;}
	};

	// input: 2006-06-25 (aaaa/mm/gg)
	// output: 25/06/2006 (gg-mm-aaaa)
	const formatDateToString = (v: string | number | Date) => {
		if (v) {
			const d = new Date(v);
			return d.toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit" });
		} else {return placeholder;}
	};

	// from string "gg/MM/aaaa" to MM/gg/aaaa
	const formatDateForPicker = (v: Date) => {
		if (v) {
			return v.toLocaleDateString("en-US");
		}
	};

	// from gg/mm/aaaa
	const getYearFromString = (v: string) => {
		if (v) {
			const d_arr = v.split("/");
			if (d_arr[2]) {return d_arr[2];}
		}
		return null;
	};

	// from "gg/MM/aaaa" to "MM/gg/aaaa"
	const formatDateGbToUs = (t: string) => {
		if (t) {
			const d_arr = t.split("/");
			return `${d_arr[1]}/${d_arr[0]}/${d_arr[2]}`;
		} else {return "";}
	};

	const formattaImporto= (importo: { toString: () => any })=>{
		// la funzione formatta gli importi con il '.' come separatore delle migliaia e la ',' per i decimali
		// inoltre si assicura che le cifre decimali siano almeno 2    
		const stringa= importo.toString();
		const splittata= stringa.split(".");
		const parteInt= splittata[0];
		const parteDec= splittata[1];
		let decimali= "";
		if(!parteDec) {decimali="00";}
		else if( parteDec.length===1) {decimali = parteDec+"0";}
		else {decimali= parteDec;}
		const parteIntFormat= parteInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		const result= parteIntFormat+","+decimali;
		return result;
	};

	const creaData = (getHours: any) => {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, "0");
		const mm = String(today.getMonth() + 1).padStart(2, "0");
		const yyyy = today.getFullYear();
		let data = dd + "/" + mm + "/" + yyyy;
		if (getHours) {
			const ore = today.getHours();
			const minuti = today.getMinutes();
			// eslint-disable-next-line sonarjs/no-nested-template-literals
			data = `${dd}/${mm}/${yyyy} ora ${ore}:${minuti < 10 ? `0${minuti}` : minuti
			}`;
		}
		return data;
	};

	// input: yyyymmgg
	// output: 25/06/2006 (gg-mm-aaaa)
	const formatDateString = (str: string) => {
		if(str) {
			if(!/^(\d){8}$/.test(str)) {return "";}
			const y = parseInt(str.substr(0,4), 10);
			const m = parseInt(str.substr(4,2), 10)-1;
			const d = parseInt(str.substr(6,2), 10);
			return new Date(y,m,d).toLocaleDateString("en-GB");
		}
	};

	const extractExtension = (str: string) => {
		if(str) {
			// eslint-disable-next-line functional/immutable-data
			return "." + str.split(".").pop();
		}
	};

	
	return {
		checkValue,
		checkTwoValues,
		checkFormatDate,
		formatPercent,
		formatCurrency,
		checkValueToLower,
		checkEmpty,
		checkValueToLowerEmpty,
		numToFloat,
		formatStringToDate,
		formatDateToString,
		formatDateForPicker,
		formatDateGbToUs,
		getYearFromString,
		formattaImporto,
		creaData,
		formatDateString,
		extractExtension,
	};
};

export default formatValues;
