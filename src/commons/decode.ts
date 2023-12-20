export function base64_decode(base64: string) {  
	// // eslint-disable-next-line functional/immutable-data
	// window.Buffer = Buffer;    
	// const back =  JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
	const back= atob(base64);
	console.log(back);
	return back;
}