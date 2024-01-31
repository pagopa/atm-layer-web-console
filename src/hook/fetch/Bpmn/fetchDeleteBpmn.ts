import fetch from "../../useFetch";

const fetchDeleteBpmn = ({abortController, body}:any, bpmnId: string, version: number) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: `/bpmn/${bpmnId}/version/${version}`, method: "DELETE", body, abortController });
	return data;
};
 
export default fetchDeleteBpmn;