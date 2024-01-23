import fetch from "../../useFetch";

const endpoint="http://localhost:3003/api/v1/model";
const urlEndpoint = "/workflowresource";

const fetchCreate = ({abortController, body}:any) => async () => {
	const fetchCreationBpmn = fetch(endpoint);
	const data = await fetchCreationBpmn({urlEndpoint, method: "POST", body, abortController});
	return data;
};

export default fetchCreate;