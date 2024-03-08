/* eslint-disable object-shorthand */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-let */
export function base64_decode(base64: string) {  
	const decoded= atob(base64);
	return decoded;
}

export function base64_encode(htmlText: string) {  
	const encoded= btoa(htmlText);
	return encoded;
}

export const downloadFile = (doc:any, type :string, docName:string, extension: string) => {
	if (doc) {
		const decodedString = base64_decode(doc);

		const fileName = `${docName}.${extension}`;
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
	}
};

export const downloadStaticFile = (detail:any) => {
	let success: boolean = false;
	if(detail?.cdnUrl){
		success = true;
		window.open(detail?.cdnUrl, "_blank")?.focus();
	}
	return success;
};
