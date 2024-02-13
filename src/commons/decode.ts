/* eslint-disable object-shorthand */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
export function base64_decode(base64: string) {  
	// // eslint-disable-next-line functional/immutable-data
	// window.Buffer = Buffer;    
	// const back =  JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
	const decoded= atob(base64);
	console.log(decoded);
	return decoded;
}

export function base64_encode(htmlText: string) {  
	const encoded= btoa(htmlText);
	console.log(encoded);
	return encoded;
}

export const downloadFile_ols = (doc:any, type :string, docName:string) => {
	if (doc) {
		// const temp=base64_decode(doc);
		const binaryString = window.atob(doc);
		const binaryLen = binaryString.length;
		const bytes = new Uint8Array(binaryLen);
		for (let i = 0; i < binaryLen; i++) {
			const ascii = binaryString.charCodeAt(i);
			bytes[i] = ascii;
		}
		const blob = new Blob([bytes], { type: type });
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		const fileName = docName;
		link.download = fileName;
		link.click();
		console.log("temp",fileName);
	}
};

export const downloadFile = (doc:any, type :string, docName:string) => {
	if (doc) {
		const decodedString = base64_decode(doc);;

		const fileName = docName;
		const fileType = type;
	
		const blob = new Blob([decodedString], { type: fileType });
	
		const a = document.createElement("a");
		a.download = fileName;
		a.href = URL.createObjectURL(blob);
		a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500); 

		// Clean up and remove the link
		// link.parentNode.removeChild(link);
	}
};