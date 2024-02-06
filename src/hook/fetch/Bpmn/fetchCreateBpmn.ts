
import { CREATE_BPMN } from "../../../commons/endpoints";
import fetch from "../../useFetch";

const fetchCreateBpmn = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	// const header={"Content-Type": "multipart/form-data"};
	const data2Send = new FormData();
	// data2Send.set("file", formData.file);
	// data2Send.set("fileName", formData.fileName);
	// data2Send.set("functionType", formData.functionType);
	// eslint-disable-next-line guard-for-in
	// for(const name in formData) {
	// 	data2Send.append(name, formData[name]);
	// };
	// Object.keys(formData).forEach(key => data2Send.append(key, formData[key]));
	// data2Send.append("file", formData.file);
	// data2Send.append("fileName", formData.fileName);
	// data2Send.append("functionType", formData.functionType);
	console.log("data2Send", data2Send);
	
	return await fetchFromServer({ 
		urlEndpoint: CREATE_BPMN, 
		method: "POST", 
		body, 
		abortController
	});

};
 
export default fetchCreateBpmn;